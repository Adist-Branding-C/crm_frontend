import { useState, useMemo, useCallback } from 'react';
import type { CallStatusItem, CallStatusFormData } from '../types/callStatus.types';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/callStatus.constants';

export function useCallStatusForm() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CallStatusItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<CallStatusItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setShowAddDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
  }, []);

  const openEditDrawer = useCallback((item: CallStatusItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
    setDropdownOpen(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const handleDeleteClick = useCallback((item: CallStatusItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const toggleDropdown = useCallback((id: number | null) => {
    setDropdownOpen(id);
  }, []);

  const editInitialValues: CallStatusFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_STATUS_INITIAL_VALUES,
    [editingItem]
  );

  return {
    showAddDrawer,
    showEditDrawer,
    editingItem,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
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
