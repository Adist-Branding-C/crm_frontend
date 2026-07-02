import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
import type { DealTaskApiResponse } from '../types/index';

export function useDeleteDealTask() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<DealTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await dealTaskApiService.delete(id);
      return response as unknown as DealTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
