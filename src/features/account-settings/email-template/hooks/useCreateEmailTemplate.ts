import { useState, useCallback } from 'react';
import { emailTemplateApiService } from '../services';
import type { EmailTemplateFormData } from '../types';

export function useCreateEmailTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: EmailTemplateFormData) => {
    setIsLoading(true);
    try {
      const response = await emailTemplateApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
