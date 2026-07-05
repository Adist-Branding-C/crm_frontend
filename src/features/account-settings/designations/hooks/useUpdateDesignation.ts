import { useState, useCallback } from 'react';
import { designationApiService } from '../services';
import type { DesignationFormData } from '../types';

export function useUpdateDesignation() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: DesignationFormData) => {
    setIsLoading(true);
    try {
      const response = await designationApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
