import { useState, useCallback } from 'react';
import { workModeApiService } from '../services';
import type { WorkModeFormData } from '../types';

export function useUpdateWorkMode() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: WorkModeFormData) => {
    setIsLoading(true);
    try {
      const response = await workModeApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
