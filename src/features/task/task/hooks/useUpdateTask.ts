import { useState, useCallback } from 'react';
import { taskApiService } from '../services/index';
import type { TaskFormData, TaskApiResponse } from '../types/index';

export function useUpdateTask() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: TaskFormData): Promise<TaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await taskApiService.update(id, data);
      return response as TaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
