import { useState, useCallback } from 'react';
import { checkoutNoteApiService } from '../services';
import type { CheckoutNoteFormData } from '../types';

export function useCreateCheckoutNote() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: CheckoutNoteFormData) => {
    setIsLoading(true);
    try {
      const response = await checkoutNoteApiService.create(data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
