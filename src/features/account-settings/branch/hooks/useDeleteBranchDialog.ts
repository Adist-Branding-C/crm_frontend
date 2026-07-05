import { useState, useCallback } from 'react';
import type { BranchItem } from '../types';

export function useDeleteBranchDialog() {
  const [deletingItem, setDeletingItem] = useState<BranchItem | null>(null);

  const handleDeleteClick = useCallback((item: BranchItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
