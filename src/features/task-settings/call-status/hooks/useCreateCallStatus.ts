import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
import type { CallStatusApiResponse } from '../types/index';

export function useCreateCallStatus() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: { name: string; status: string }): Promise<CallStatusApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callStatusApiService.create(data);
      return response as CallStatusApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
