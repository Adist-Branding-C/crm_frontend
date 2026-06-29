import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
import type { CallStatusApiResponse } from '../types/index';

export function useDeleteCallStatus() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<CallStatusApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callStatusApiService.delete(id);
      return response as unknown as CallStatusApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
