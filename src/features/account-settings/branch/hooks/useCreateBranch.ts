import { useState, useCallback } from 'react';
import { branchApiService } from '../services';
import type { BranchFormData } from '../types';

export function useCreateBranch() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: BranchFormData) => {
    setIsLoading(true);
    try {
      const response = await branchApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
