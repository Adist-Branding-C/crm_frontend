import { useState, useCallback } from 'react';
import { whatsappTemplateApiService } from '../services';
import type { WhatsappTemplateFormData } from '../types';

export function useUpdateWhatsappTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: WhatsappTemplateFormData) => {
    setIsLoading(true);
    try {
      const response = await whatsappTemplateApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
