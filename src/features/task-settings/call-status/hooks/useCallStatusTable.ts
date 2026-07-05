import { useState, useCallback } from 'react';
import type { CallStatusItem } from '../types/index';

export function useCallStatusTable() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<CallStatusItem | null>(null);

  const toggleDropdown = useCallback((id: number | null) => setDropdownOpen(id), []);

  const handleDeleteClick = useCallback((item: CallStatusItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const closeDeleteDialog = useCallback(() => setDeletingItem(null), []);

  return {
    dropdownOpen,
    toggleDropdown,
    deletingItem,
    handleDeleteClick,
    closeDeleteDialog,
  };
}
