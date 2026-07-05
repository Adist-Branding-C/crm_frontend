import { useState, useCallback } from 'react';
import type { CallTaskItem } from '../types/index';

export function useDeleteCallTaskDialog() {
  const [deletingItem, setDeletingItem] = useState<CallTaskItem | null>(null);

  const handleDeleteClick = useCallback((item: CallTaskItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
