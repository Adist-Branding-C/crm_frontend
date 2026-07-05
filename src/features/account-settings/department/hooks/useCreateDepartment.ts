import { useState, useCallback } from 'react';
import { departmentApiService } from '../services';
import type { DepartmentFormData } from '../types';

export function useCreateDepartment() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: DepartmentFormData) => {
    setIsLoading(true);
    try {
      const response = await departmentApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
