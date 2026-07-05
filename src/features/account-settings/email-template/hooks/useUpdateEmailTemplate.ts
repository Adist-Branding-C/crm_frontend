import { useState, useCallback } from 'react';
import { emailTemplateApiService } from '../services';
import type { EmailTemplateFormData } from '../types';

export function useUpdateEmailTemplate() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: EmailTemplateFormData) => {
    setIsLoading(true);
    try {
      const response = await emailTemplateApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
