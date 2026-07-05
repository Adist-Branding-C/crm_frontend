import { useState, useCallback } from 'react';
import type { WorkModeItem } from '../types';

export function useDeleteWorkModeDialog() {
  const [deletingItem, setDeletingItem] = useState<WorkModeItem | null>(null);

  const handleDeleteClick = useCallback((item: WorkModeItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
