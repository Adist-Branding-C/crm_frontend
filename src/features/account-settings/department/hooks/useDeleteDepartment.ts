import { useState, useCallback } from 'react';
import { departmentApiService } from '../services';

export function useDeleteDepartment() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await departmentApiService.delete(id);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
