import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
import type { DealTaskFormData, DealTaskApiResponse } from '../types/index';

export function useCreateDealTask() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: DealTaskFormData): Promise<DealTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await dealTaskApiService.create(data);
      return response as DealTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
