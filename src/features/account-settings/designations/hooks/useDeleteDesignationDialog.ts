import { useState, useCallback } from 'react';
import type { DesignationItem } from '../types';

export function useDeleteDesignationDialog() {
  const [deletingItem, setDeletingItem] = useState<DesignationItem | null>(null);

  const handleDeleteClick = useCallback((item: DesignationItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
