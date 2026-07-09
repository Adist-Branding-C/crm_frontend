import { useState, useCallback, useEffect, useRef } from 'react';
import { leadPurposeService } from '../../lead-purpose/services';
import { useLeadAdditionalPagination } from './useLeadAdditionalPagination';
import { useLeadAdditionalCrud } from './useLeadAdditionalCrud';
import { useLeadAdditionalForm } from './useLeadAdditionalForm';
import { useLeadAdditionalToast } from './useLeadAdditionalToast';
import { mapPurposeApiToUI } from '../mappers/additionalField.mapper';
import type { LeadAdditionalItem, LeadPurposeOption } from '../types';

export function useLeadAdditionalData() {
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [purposes, setPurposes] = useState<LeadPurposeOption[]>([]);

  const toast = useLeadAdditionalToast();

  const refetchRef = useRef<() => Promise<void>>(async () => {});
  const stableRefetch = useCallback(() => refetchRef.current(), []);

  const crud = useLeadAdditionalCrud({
    onError: setError,
    onDeleteSuccess: toast.showSuccessToast,
    onDropdownClose: () => setDropdownOpen(null),
    refetch: stableRefetch,
  });

  const pagination = useLeadAdditionalPagination(crud.fetchData);

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
    leadPurposeService.getLeadPurposes(1, 100).then(response => {
      setPurposes((response.data.items || []).map(mapPurposeApiToUI));
    }).catch(() => {});
  }, []);

  const form = useLeadAdditionalForm({
    items: crud.items,
    fetchData: crud.fetchData,
    createField: crud.createField,
    updateField: crud.updateField,
    currentPage: pagination.currentPage,
    rowsPerPage: pagination.rowsPerPage,
    searchQuery: pagination.searchQuery,
    resetPage: pagination.resetPage,
    onError: setError,
    onDropdownClose: () => setDropdownOpen(null),
  });

  const handleDeleteClick = useCallback((item: LeadAdditionalItem) => {
    crud.handleDeleteClick(item);
  }, [crud.handleDeleteClick]);

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
    purposes,
    setCurrentPage: pagination.handleSetCurrentPage,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    handleAddClick: form.handleAddClick,
    handleEditClick: form.handleEditClick,
    handleDeleteClick,
    handleCloseForm: form.handleCloseForm,
    hasChanges: form.hasChanges,
    handleSubmit: form.handleSubmit,
    showSaveConfirm: form.showSaveConfirm,
    saveConfirmMode: form.saveConfirmMode,
    executeSave: form.executeSave,
    cancelSave: form.cancelSave,
    handleConfirmDelete: crud.handleConfirmDelete,
    formData: form.formData,
    setFormData: form.setFormData,
    handleInputChange: form.handleInputChange,
    handleDropdownValueChange: form.handleDropdownValueChange,
    handleAddDropdownValue: form.handleAddDropdownValue,
    handleRemoveDropdownValue: form.handleRemoveDropdownValue,
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
