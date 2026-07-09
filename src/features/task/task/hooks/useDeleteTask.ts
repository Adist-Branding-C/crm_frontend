import { useState, useCallback } from 'react';
import { taskApiService } from '../services/index';
import type { TaskApiResponse } from '../types/index';

export function useDeleteTask() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<TaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await taskApiService.delete(id);
      return response as unknown as TaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
