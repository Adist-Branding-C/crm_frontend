import { useState, useCallback } from 'react';
import { agentApiService } from '../services';
import type { AgentFormData } from '../types';

export function useCreateAgent() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: Omit<AgentFormData, 'confirmPassword'>) => {
    setIsLoading(true);
    try {
      const response = await agentApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
