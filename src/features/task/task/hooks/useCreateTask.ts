import { useState, useCallback } from 'react';
import { taskApiService } from '../services/index';
import type { TaskFormData, TaskApiResponse } from '../types/index';

export function useCreateTask() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: TaskFormData): Promise<TaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await taskApiService.create(data);
      return response as TaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
