import { useState, useMemo, useCallback } from 'react';
import type { MeetingOutcomeItem, MeetingOutcomeFormData } from '../types/meetingOutcome.types';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from '../constants/meetingOutcome.constants';

export function useMeetingOutcomeForm() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<MeetingOutcomeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<MeetingOutcomeItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setShowAddDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
  }, []);

  const openEditDrawer = useCallback((item: MeetingOutcomeItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
    setDropdownOpen(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const handleDeleteClick = useCallback((item: MeetingOutcomeItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const toggleDropdown = useCallback((id: number | null) => {
    setDropdownOpen(id);
  }, []);

  const editInitialValues: MeetingOutcomeFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_MEETING_OUTCOME_INITIAL_VALUES,
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
