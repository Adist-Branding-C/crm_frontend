import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
import type { CallReasonApiResponse } from '../types/index';

export function useDeleteCallReason() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<CallReasonApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callReasonApiService.delete(id);
      return response as unknown as CallReasonApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
