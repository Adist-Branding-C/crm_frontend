import { useState, useCallback } from 'react';
import { designationApiService } from '../services';
import type { DesignationFormData } from '../types';

export function useCreateDesignation() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: DesignationFormData) => {
    setIsLoading(true);
    try {
      const response = await designationApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
