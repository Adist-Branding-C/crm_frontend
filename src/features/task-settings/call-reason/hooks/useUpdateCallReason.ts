import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
import type { CallReasonApiResponse } from '../types/index';

export function useUpdateCallReason() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: { name: string; status: string }): Promise<CallReasonApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callReasonApiService.update(id, data);
      return response as CallReasonApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
