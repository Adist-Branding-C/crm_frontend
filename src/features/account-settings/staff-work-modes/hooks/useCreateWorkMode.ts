import { useState, useCallback } from 'react';
import { workModeApiService } from '../services';
import type { WorkModeFormData } from '../types';

export function useCreateWorkMode() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: WorkModeFormData) => {
    setIsLoading(true);
    try {
      const response = await workModeApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
