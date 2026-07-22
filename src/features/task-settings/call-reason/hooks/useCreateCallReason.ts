import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
import type { CallReasonApiResponse } from '../types/index';

export function useCreateCallReason() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: { name: string; status: string }): Promise<CallReasonApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callReasonApiService.create(data);
      return response as CallReasonApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
