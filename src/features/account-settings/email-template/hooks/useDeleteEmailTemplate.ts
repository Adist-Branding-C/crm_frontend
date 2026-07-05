import { useState, useCallback } from 'react';
import { emailTemplateApiService } from '../services';

export function useDeleteEmailTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await emailTemplateApiService.delete(id);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
