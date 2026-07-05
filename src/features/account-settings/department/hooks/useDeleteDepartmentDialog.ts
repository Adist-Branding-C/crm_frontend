import { useState, useCallback } from 'react';
import type { DepartmentItem } from '../types';

export function useDeleteDepartmentDialog() {
  const [deletingItem, setDeletingItem] = useState<DepartmentItem | null>(null);

  const handleDeleteClick = useCallback((item: DepartmentItem) => {
    setDeletingItem(item);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return { deletingItem, handleDeleteClick, closeDeleteDialog };
}
