import { useState, useCallback } from 'react';
import { designationApiService } from '../services';

export function useDeleteDesignation() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await designationApiService.delete(id);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
