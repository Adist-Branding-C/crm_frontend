import { useState, useMemo, useCallback } from 'react';
import type { TaskCategoryItem, TaskCategoryFormData } from '../types/index';
import { ADD_TASK_CATEGORY_INITIAL_VALUES } from '../constants/index';

export function useTaskCategoryForm() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<TaskCategoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<TaskCategoryItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setShowAddDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
  }, []);

  const openEditDrawer = useCallback((item: TaskCategoryItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
    setDropdownOpen(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const handleDeleteClick = useCallback((item: TaskCategoryItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const toggleDropdown = useCallback((id: number | null) => {
    setDropdownOpen(id);
  }, []);

  const editInitialValues: TaskCategoryFormData = useMemo(
    () => editingItem
      ? { category: editingItem.category || '', action: editingItem.action || '' }
      : ADD_TASK_CATEGORY_INITIAL_VALUES,
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
