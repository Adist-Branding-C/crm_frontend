import { useState, useCallback } from 'react';
import { whatsappTemplateApiService } from '../services';

export function useDeleteWhatsappTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await whatsappTemplateApiService.delete(id);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
