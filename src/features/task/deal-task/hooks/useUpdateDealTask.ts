import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
import type { DealTaskFormData, DealTaskApiResponse } from '../types/index';

export function useUpdateDealTask() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: DealTaskFormData): Promise<DealTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await dealTaskApiService.update(id, data);
      return response as DealTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
