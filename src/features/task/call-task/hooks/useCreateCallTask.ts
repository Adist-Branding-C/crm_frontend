import { useState, useCallback } from 'react';
import { callTaskApiService } from '../services/index';
import type { CallTaskFormData, CallTaskApiResponse } from '../types/index';

export function useCreateCallTask() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: CallTaskFormData): Promise<CallTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callTaskApiService.create(data);
      return response as CallTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
