import { useState, useCallback } from 'react';
import { whatsappTemplateApiService } from '../services';
import type { WhatsappTemplateFormData } from '../types';

export function useCreateWhatsappTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: WhatsappTemplateFormData) => {
    setIsLoading(true);
    try {
      const response = await whatsappTemplateApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
