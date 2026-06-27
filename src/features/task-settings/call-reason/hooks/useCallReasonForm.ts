import { useState, useMemo, useCallback } from 'react';
import type { CallReasonItem, CallReasonFormData } from '../types/index';
import { ADD_CALL_REASON_INITIAL_VALUES } from '../constants/index';

export function useCallReasonForm() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CallReasonItem | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<CallReasonItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setShowAddDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
  }, []);

  const openEditDrawer = useCallback((item: CallReasonItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
    setDropdownOpen(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const handleDeleteClick = useCallback((item: CallReasonItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const toggleDropdown = useCallback((id: number | null) => {
    setDropdownOpen(id);
  }, []);

  const editInitialValues: CallReasonFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_REASON_INITIAL_VALUES,
    [editingItem]
  );

  return {
    showAddDrawer,
    showEditDrawer,
    editingItem,
    dropdownOpen,
    toggleDropdown,
    deletingItem,
    openAddDrawer,
    closeAddDrawer,
    openEditDrawer,
    closeEditDrawer,
    handleDeleteClick,
    closeDeleteDialog,
    editInitialValues,
  };
}
