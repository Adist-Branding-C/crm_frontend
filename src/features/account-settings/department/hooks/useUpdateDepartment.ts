import { useState, useCallback } from 'react';
import { departmentApiService } from '../services';
import type { DepartmentFormData } from '../types';

export function useUpdateDepartment() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: DepartmentFormData) => {
    setIsLoading(true);
    try {
      const response = await departmentApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
