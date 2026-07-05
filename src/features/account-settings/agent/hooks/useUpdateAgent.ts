import { useState, useCallback } from 'react';
import { agentApiService } from '../services';
import type { AgentFormData } from '../types';

export function useUpdateAgent() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (staffId: string | number, data: AgentFormData) => {
    setIsLoading(true);
    try {
      const response = await agentApiService.update(String(staffId), data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
