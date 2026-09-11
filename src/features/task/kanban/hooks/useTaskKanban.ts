import { useState, useCallback } from 'react';
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { taskKanbanService } from '../services/taskKanbanService';
import type { TaskKanbanStage, TaskKanbanTask } from '../types/kanban.types';

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

export function useTaskKanban(
  workflowId: string | null,
  taskType: string,
  onError?: (message: string) => void,
) {
  const [stages, setStages] = useState<TaskKanbanStage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingStageId, setLoadingStageId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const fetchKanban = useCallback(async (wfId: string) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await taskKanbanService.getKanban(wfId, taskType);
      setStages(data);
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'message' in err
        ? (err as { message: string }).message
        : 'Failed to load kanban board';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [taskType]);

  const loadMore = useCallback(async (stageId: string) => {
    if (!workflowId || loadingStageId) return;
    const stage = stages.find((s) => s.stageId === stageId);
    if (!stage) return;
    const hasMore = stage.items.length < stage.count || stage.pagination.has_next;
    if (!hasMore || !stage.pagination.page) return;
    const nextPage = stage.pagination.page + 1;
    const limit = stage.pagination.limit;
    setLoadingStageId(stageId);
    try {
      const result = await taskKanbanService.loadMoreStage(
        workflowId,
        stageId,
        nextPage,
        limit,
        taskType,
      );
      setStages((prev) =>
        prev.map((s) => {
          if (s.stageId !== result.stageId) return s;
          const loadedIds = new Set(s.items.map((t) => t.id));
          const fresh = result.items.filter((t) => !loadedIds.has(t.id));
          return {
            ...s,
            items: [...s.items, ...fresh],
            count: result.pagination.total ?? s.count,
            pagination: result.pagination,
          };
        }),
      );
    } catch {
      onError?.('Failed to load more tasks');
    } finally {
      setLoadingStageId(null);
    }
  }, [workflowId, loadingStageId, stages, taskType, onError]);

  const handleDragStart = useCallback((_event: DragStartEvent) => {}, []);

  const handleDragCancel = useCallback(() => {}, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const task = active.data.current?.task as TaskKanbanTask | undefined;
      const fromStageId = active.data.current?.stageId as string | undefined;
      const toStageId = over.data.current?.stageId as string | undefined;

      if (!task || !fromStageId || !toStageId || fromStageId === toStageId) return;

      // Optimistic move
      setStages((prev) => moveTask(prev, task, fromStageId, toStageId));

      // Persist
      taskKanbanService.moveTask(task.id, toStageId).catch(() => {
        // Rollback
        setStages((prev) => moveTask(prev, { ...task, status: toStageId }, toStageId, fromStageId));
        onError?.('Failed to move task. Please try again.');
      });
    },
    [onError],
  );

  return {
    stages,
    isLoading,
    error,
    loadingStageId,
    sensors,
    fetchKanban,
    loadMore,
    setStages,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
