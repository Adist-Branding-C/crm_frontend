import { useState, useCallback, useEffect, useRef } from 'react';
import { useLeadStatusPagination } from './useLeadStatusPagination';
import { useLeadStatusCrud } from './useLeadStatusCrud';
import { useLeadStatusForm } from './useLeadStatusForm';
import { useLeadStatusToast } from './useLeadStatusToast';
import type { LeadStatusItem } from '../types';

export function useLeadStatusData() {
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toast = useLeadStatusToast();

  const refetchRef = useRef<() => Promise<void>>(async () => {});
  const stableRefetch = useCallback(() => refetchRef.current(), []);

  const crud = useLeadStatusCrud({
    onError: setError,
    onDeleteSuccess: toast.showSuccessToast,
    onDropdownClose: () => setDropdownOpen(null),
    refetch: stableRefetch,
  });

  const pagination = useLeadStatusPagination(crud.fetchData);

  refetchRef.current = () => crud.fetchData(
    pagination.currentPage,
    pagination.rowsPerPage,
    pagination.searchQuery,
  );

  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    crud.fetchData(1, pagination.rowsPerPage, '');
  }, []);

  const form = useLeadStatusForm({
    items: crud.items,
    fetchData: crud.fetchData,
    createStatus: crud.createStatus,
    updateStatus: crud.updateStatus,
    currentPage: pagination.currentPage,
    rowsPerPage: pagination.rowsPerPage,
    searchQuery: pagination.searchQuery,
    resetPage: pagination.resetPage,
    onError: setError,
    onDropdownClose: () => setDropdownOpen(null),
  });

  const handleDeleteClick = useCallback((item: LeadStatusItem) => {
    crud.handleDeleteClick(item);
  }, [crud.handleDeleteClick]);

  const handleEdit = useCallback((item: LeadStatusItem) => {
    form.handleEdit(item);
  }, [form.handleEdit]);

  return {
    paginatedData: crud.items,
    totalItems: crud.total,
    showForm: form.showForm,
    setShowForm: form.setShowForm,
    editingItem: form.editingItem,
    setEditingItem: form.setEditingItem,
    deletingItem: crud.deletingItem,
    setDeletingItem: crud.setDeletingItem,
    dropdownOpen,
    setDropdownOpen,
    searchQuery: pagination.searchQuery,
    setSearchQuery: pagination.setSearchQuery,
    currentPage: pagination.currentPage,
    totalPages: crud.totalPages,
    startIndex: pagination.startIndex,
    rowsPerPage: pagination.rowsPerPage,
    setCurrentPage: pagination.handleSetCurrentPage,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    handleAdd: form.handleAdd,
    handleEdit,
    handleDeleteClick,
    handleCloseForm: form.handleCloseForm,
    hasChanges: form.hasChanges,
    handleSave: form.handleSave,
    showSaveConfirm: form.showSaveConfirm,
    saveConfirmMode: form.saveConfirmMode,
    executeSave: form.executeSave,
    cancelSave: form.cancelSave,
    handleConfirmDelete: crud.handleConfirmDelete,
    formData: form.formData,
    setFormData: form.setFormData,
    isLoading: crud.isLoading,
    isSaving: form.isSaving,
    isDeleting: crud.isDeleting,
    error,
    clearError: form.clearError,
    showToast: toast.showToast,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    clearToast: toast.clearToast,
  };
}
