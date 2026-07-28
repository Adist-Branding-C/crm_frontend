import { useState, useCallback } from 'react';
import { pipelineService } from '../services/PipelineService';
import { getErrorMessage } from '../../../shared/utils/error';
import { PIPELINE_PAGINATION_LIMIT } from '../constants';
import type { TaskStatusGroup, GetPipelineParams } from '../types';


export function useTasksPipeline(onError: (message: string) => void) {
  const [taskGroups, setTaskGroups] = useState<TaskStatusGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTaskStatus, setLoadingTaskStatus] = useState<string | null>(
    null,
  );

  const fetchTasks = useCallback(
    async (params: Partial<GetPipelineParams>) => {
      setIsLoading(true);
      try {
        const response = await pipelineService.getTasks(params);
        if (response.status && response.data) {
          setTaskGroups(response.data.items);
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to fetch tasks'));
      } finally {
        setIsLoading(false);
      }
    },
    [onError],
  );

  const loadMoreTasks = useCallback(
    async (status: string) => {
      setLoadingTaskStatus(status);
      try {
        const taskGroup = taskGroups.find((g) => g.status === status);
        if (!taskGroup) return;

        const skip = taskGroup.items.length;
        const response = await pipelineService.getStatusTasks(
          status,
          skip,
          PIPELINE_PAGINATION_LIMIT,
        );

        if (response.status && response.data) {
          const items = response.data.items;
          const count = response.data.pagination?.totalItems ?? response.data.count;
          setTaskGroups((prevGroups) =>
            prevGroups.map((group) => {
              if (group.status !== status) return group;
              const existingIds = new Set(group.items.map((t) => t.id));
              const newTasks = items.filter((t) => !existingIds.has(t.id));
              return { ...group, items: [...group.items, ...newTasks], count };
            }),
          );
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to load more tasks'));
      } finally {
        setLoadingTaskStatus(null);
      }
    },
    [taskGroups, onError],
  );

  return {
    taskGroups,
    setTaskGroups,
    isLoading,
    loadingTaskStatus,
    fetchTasks,
    loadMoreTasks,
  };
}
