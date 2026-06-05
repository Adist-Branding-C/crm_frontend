import { useState, useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useWorkModes } from './useWorkModes';
import type { WorkModeItem, WorkModeFormData } from '../types/workMode.types';

export function useWorkModePage() {
  const workMode = useWorkModes();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<WorkModeItem | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState<WorkModeItem | null>(null);

  const filteredData = useMemo(
    () => workMode.workModeList.filter(item =>
      (item.workModeName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [workMode.workModeList, searchQuery]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const handleSubmit = useCallback(async (
    values: WorkModeFormData,
    helpers: FormikHelpers<WorkModeFormData>,
  ) => {
    const success = await workMode.handleAddWorkMode(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [workMode.handleAddWorkMode, handleCloseDrawer]);

  const handleEditClick = useCallback((item: WorkModeItem) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: WorkModeItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await workMode.handleDeleteWorkMode(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, workMode.handleDeleteWorkMode]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues: WorkModeFormData = useMemo(
    () => editingItem
      ? {
          workModeName: editingItem.workModeName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : workMode.initialValues,
    [editingItem, workMode.initialValues]
  );

  const handleEditSubmit = useCallback(async (
    values: WorkModeFormData,
    helpers: FormikHelpers<WorkModeFormData>,
  ) => {
    if (!editingItem) return;
    const success = await workMode.handleUpdateWorkMode(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, workMode.handleUpdateWorkMode, handleCloseDrawer]);

  return {
    workMode,
    searchQuery,
    setSearchQuery,
    showDrawer,
    dropdownOpen,
    setDropdownOpen,
    editingItem,
    deletingItem,
    rowsPerPage,
    setRowsPerPage,
    filteredData,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
    drawerInitialValues,
  };
}
