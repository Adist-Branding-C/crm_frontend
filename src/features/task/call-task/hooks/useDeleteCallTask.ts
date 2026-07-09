import { useState, useCallback } from 'react';
import { callTaskApiService } from '../services/index';
import type { CallTaskApiResponse } from '../types/index';

export function useDeleteCallTask() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<CallTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callTaskApiService.delete(id);
      return response as unknown as CallTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
