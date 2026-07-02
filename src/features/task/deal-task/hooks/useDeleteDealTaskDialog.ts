import { useState, useCallback } from 'react';
import type { DealTaskItem } from '../types/index';

export function useDeleteDealTaskDialog() {
  const [deletingItem, setDeletingItem] = useState<DealTaskItem | null>(null);

  const handleDeleteClick = useCallback((item: DealTaskItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
