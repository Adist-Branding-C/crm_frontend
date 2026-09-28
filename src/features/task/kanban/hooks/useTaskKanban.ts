import { useState, useCallback } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useAppDispatch } from '../../../../store/hooks';
import { getErrorMessage } from '../../../../shared/utils/error';
import {
  taskApi,
  useGetTaskKanbanQuery,
  useLazyGetTaskKanbanPageQuery,
  useMoveTaskStageMutation,
  type TaskKanbanArgs,
} from '../../common/services/taskApi';
import type { TaskKanbanStage, TaskKanbanTask } from '../types/kanban.types';
import { getKanbanLoadMoreState } from '../utils/taskKanbanPagination';

function moveTask(
  stages: TaskKanbanStage[],
  task: TaskKanbanTask,
  fromStageId: string,
  toStageId: string,
): TaskKanbanStage[] {
  return stages.map((stage) => {
    if (stage.stageId === fromStageId) {
      return {
        ...stage,
        items: stage.items.filter((t) => t.id !== task.id),
        count: stage.count - 1,
      };
    }
    if (stage.stageId === toStageId) {
      return {
        ...stage,
        items: [...stage.items, { ...task, status: toStageId }],
        count: stage.count + 1,
      };
    }
    return stage;
  });
}

/**
 * Kanban board data, per-column "load more", and drag-to-move.
 *
 * Used by:
 * - TaskKanbanView
 *
 * Notes:
 * - The board comes from the Redux cache (taskApi.getTaskKanban). It refetches by
 *   itself when the workflow/type/search changes, and after any task is
 *   created/updated/deleted.
 * - "Load more" and drag both change the cached board directly with
 *   `taskApi.util.updateQueryData`, so the screen updates instantly.
 */
export function useTaskKanban(
  workflowId: string | null,
  taskType: string,
  onError?: (message: string) => void,
  search?: string,
) {
  const dispatch = useAppDispatch();
  const [loadingStageId, setLoadingStageId] = useState<string | null>(null);
  const [fetchKanbanPage] = useLazyGetTaskKanbanPageQuery();
  const [moveTaskStage] = useMoveTaskStageMutation();

  // The same args are used to read the board and to update it in the cache.
  const boardArgs: TaskKanbanArgs | null = workflowId ? { workflowId, taskType, search } : null;

  const { data, isFetching, error, refetch } = useGetTaskKanbanQuery(
    boardArgs ?? skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const stages = data ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const loadMore = useCallback(async (stageId: string) => {
    if (!boardArgs || loadingStageId) return;

    const stage = stages.find((s) => s.stageId === stageId);
    if (!stage) return;

    const { hasMore, requestedLimit } = getKanbanLoadMoreState({
      totalCount: Number(stage.count ?? 0),
      loadedCount: stage.items.length,
      defaultLimit: stage.pagination.limit || 10,
      hasNext: stage.pagination.has_next,
    });

    if (!hasMore) return;

    const nextPage = Number(stage.pagination.page ?? 1) + 1;
    const limit = requestedLimit || 1;

    setLoadingStageId(stageId);
    try {
      // 1. Fetch the next page, then pick out this column.
      const pageStages = await fetchKanbanPage({ ...boardArgs, pageNumber: nextPage, limit }).unwrap();
      const page = pageStages.find((s) => s.stageId === stageId);
      if (!page) throw new Error('Stage not found');

      // 2. Append the new cards to the cached board (skipping any already shown).
      dispatch(taskApi.util.updateQueryData('getTaskKanban', boardArgs, (cachedStages) =>
        cachedStages.map((s) => {
          if (s.stageId !== stageId) return s;

          const loadedIds = new Set(s.items.map((t) => t.id));
          const mergedItems = [...s.items, ...page.items.filter((t) => !loadedIds.has(t.id))];
          const total = Number(page.pagination.total ?? mergedItems.length);

          return {
            ...s,
            items: mergedItems,
            count: total,
            pagination: { ...page.pagination, has_next: Boolean(page.pagination.has_next) && total > mergedItems.length },
          };
        })));
    } catch (err: unknown) {
      console.error('Failed to load more tasks for kanban stage', err);
      onError?.('Failed to load more tasks');
    } finally {
      setLoadingStageId(null);
    }
  }, [boardArgs, loadingStageId, stages, fetchKanbanPage, dispatch, onError]);

  const handleDragStart = useCallback((_event: DragStartEvent) => {}, []);

  const handleDragCancel = useCallback(() => {}, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !boardArgs) return;

      const task = active.data.current?.task as TaskKanbanTask | undefined;
      const fromStageId = active.data.current?.stageId as string | undefined;
      const toStageId = over.data.current?.stageId as string | undefined;

      if (!task || !fromStageId || !toStageId || fromStageId === toStageId) return;

      // 1. Move the card on screen right away.
      const moved = dispatch(taskApi.util.updateQueryData('getTaskKanban', boardArgs, (cachedStages) =>
        moveTask(cachedStages, task, fromStageId, toStageId)));

      // 2. Save it. 3. If saving fails, put the card back.
      try {
        await moveTaskStage({ taskId: task.id, stageId: toStageId }).unwrap();
      } catch {
        moved.undo();
        onError?.('Failed to move task. Please try again.');
      }
    },
    [boardArgs, dispatch, moveTaskStage, onError],
  );

  return {
    stages,
    isLoading: isFetching,
    error: error ? getErrorMessage(error, 'Failed to load kanban board') : '',
    loadingStageId,
    sensors,
    refetch,
    loadMore,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
