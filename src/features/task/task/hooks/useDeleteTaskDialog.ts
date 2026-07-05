import { useState, useCallback } from 'react';
import type { TaskItem } from '../types/index';

export function useDeleteTaskDialog() {
  const [deletingItem, setDeletingItem] = useState<TaskItem | null>(null);

  const handleDeleteClick = useCallback((item: TaskItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
