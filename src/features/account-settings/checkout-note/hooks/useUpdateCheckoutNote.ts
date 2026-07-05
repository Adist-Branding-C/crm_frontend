import { useState, useCallback } from 'react';
import { checkoutNoteApiService } from '../services';
import type { CheckoutNoteFormData } from '../types';

export function useUpdateCheckoutNote() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: CheckoutNoteFormData) => {
    setIsLoading(true);
    try {
      const response = await checkoutNoteApiService.update(id, data);
      return response as typeof response & { errors?: Record<string, string[]>; field?: string };
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
