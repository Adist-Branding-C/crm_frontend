import { useState, useCallback } from 'react';
import { branchApiService } from '../services';
import type { BranchFormData } from '../types';

export function useUpdateBranch() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: BranchFormData) => {
    setIsLoading(true);
    try {
      const response = await branchApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
