import { useState, useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useDesignation } from './useDesignation';
import type { DesignationItem, DesignationFormData } from '../types/designation.types';

export function useDesignationPage() {
  const designation = useDesignation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<DesignationItem | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState<DesignationItem | null>(null);

  const filteredData = useMemo(
    () => designation.designationList.filter(item =>
      (item.designationName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [designation.designationList, searchQuery]
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
    values: DesignationFormData,
    helpers: FormikHelpers<DesignationFormData>,
  ) => {
    const success = await designation.handleAddDesignation(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [designation.handleAddDesignation, handleCloseDrawer]);

  const handleEditClick = useCallback((item: DesignationItem) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: DesignationItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await designation.handleDeleteDesignation(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, designation.handleDeleteDesignation]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues: DesignationFormData = useMemo(
    () => editingItem
      ? {
          designationName: editingItem.designationName || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : { designationName: '', description: '', status: '' },
    [editingItem]
  );

  const handleEditSubmit = useCallback(async (
    values: DesignationFormData,
    helpers: FormikHelpers<DesignationFormData>,
  ) => {
    if (!editingItem) return;
    const success = await designation.handleUpdateDesignation(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, designation.handleUpdateDesignation, handleCloseDrawer]);

  return {
    designation,
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
