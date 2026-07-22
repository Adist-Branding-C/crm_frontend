import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
import type { CallStatusApiResponse } from '../types/index';

export function useUpdateCallStatus() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: { name: string; status: string }): Promise<CallStatusApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await callStatusApiService.update(id, data);
      return response as CallStatusApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
