import { useState, useCallback } from 'react';
import type { CallReasonItem } from '../types/index';

export function useDeleteCallReasonDialog() {
  const [deletingItem, setDeletingItem] = useState<CallReasonItem | null>(null);

  const handleDeleteClick = useCallback((item: CallReasonItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
