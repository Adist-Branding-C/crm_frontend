import { useState, useCallback } from 'react';
import { callTaskApiService } from '../services/index';
import type { CallTaskFormData, CallTaskApiResponse } from '../types/index';

export function useUpdateCallTask() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: CallTaskFormData): Promise<CallTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callTaskApiService.update(id, data);
      return response as CallTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
