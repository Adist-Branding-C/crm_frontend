import { useState, useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useDepartment } from './useDepartment';
import type { DepartmentItem, DepartmentFormData } from '../types/department.types';

export function useDepartmentPage() {
  const department = useDepartment();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<DepartmentItem | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState<DepartmentItem | null>(null);

  const filteredData = useMemo(
    () => department.departmentList.filter(item =>
      (item.departmentName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [department.departmentList, searchQuery]
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
    values: DepartmentFormData,
    helpers: FormikHelpers<DepartmentFormData>,
  ) => {
    const success = await department.handleAddDepartment(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [department.handleAddDepartment, handleCloseDrawer]);

  const handleEditClick = useCallback((item: DepartmentItem) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: DepartmentItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await department.handleDeleteDepartment(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, department.handleDeleteDepartment]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues: DepartmentFormData = useMemo(
    () => editingItem
      ? {
          departmentName: editingItem.departmentName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : { departmentName: '', description: '', status: '' },
    [editingItem]
  );

  const handleEditSubmit = useCallback(async (
    values: DepartmentFormData,
    helpers: FormikHelpers<DepartmentFormData>,
  ) => {
    if (!editingItem) return;
    const success = await department.handleUpdateDepartment(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, department.handleUpdateDepartment, handleCloseDrawer]);

  return {
    department,
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
