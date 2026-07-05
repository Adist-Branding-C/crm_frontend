import { useState, useCallback } from 'react';
import type { CheckoutNoteItem } from '../types';

export function useDeleteCheckoutNoteDialog() {
  const [deletingItem, setDeletingItem] = useState<CheckoutNoteItem | null>(null);

  const handleDeleteClick = useCallback((item: CheckoutNoteItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
