import { useState, useCallback } from 'react';
import { agentApiService } from '../services';

export function useDeleteAgent() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (staffId: string | number) => {
    setIsLoading(true);
    try {
      const response = await agentApiService.delete(String(staffId));
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
