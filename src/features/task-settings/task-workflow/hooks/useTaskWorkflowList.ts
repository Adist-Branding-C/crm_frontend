import { useCallback, useEffect, useState } from 'react';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import type { TaskWorkflowItem } from '../types/interface';

/**
 * Fetches and manages the task-workflow list with CRUD operations.
 * Follows the useDealPipelineList pattern but adapted for task-settings table layout.
 */
export function useTaskWorkflowList() {
  const [workflows, setWorkflows] = useState<TaskWorkflowItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const items = await taskWorkflowService.getAllWorkflows();
      setWorkflows(items);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createWorkflow = useCallback(
    async (name: string): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await taskWorkflowService.createWorkflow(name);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  const setDefaultWorkflow = useCallback(
    async (id: number): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await taskWorkflowService.setDefaultWorkflow(id);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  const deleteWorkflow = useCallback(
    async (id: number): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await taskWorkflowService.deleteWorkflow(id);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  return {
    workflows,
    isLoading,
    error,
    refresh,
    createWorkflow,
    setDefaultWorkflow,
    deleteWorkflow,
  };
}
