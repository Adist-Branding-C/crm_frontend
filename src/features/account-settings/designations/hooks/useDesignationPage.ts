import { useState } from 'react';
import { useFetchDesignations } from './useFetchDesignations';
import { useDesignationSubmitHandlers } from './useDesignationSubmitHandlers';
import { useDesignationDrawer } from './useDesignationDrawer';
import { useDesignationDrawerState } from './useDesignationDrawerState';
import { useDeleteDesignationDialog } from './useDeleteDesignationDialog';
import { useDesignationDropdown } from './useDesignationDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useDesignationPage() {
  const [dependencyError, setDependencyError] = useState(false);
  const fetch = useFetchDesignations();
  const drawer = useDesignationDrawer();
  const deleteDialog = useDeleteDesignationDialog();
  const dropdown = useDesignationDropdown();
  const toast = useToast();

  const handlers = useDesignationSubmitHandlers(
    {
      onAddSuccess: drawer.closeDrawer,
      onEditSuccess: drawer.closeDrawer,
      onDeleteSuccess: deleteDialog.closeDeleteDialog,
      onDependencyError: () => setDependencyError(true),
      editingItem: drawer.editingItem,
      deletingItem: deleteDialog.deletingItem,
    },
    fetch,
    toast,
  );

  const drawerState = useDesignationDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.designationList,
    searchQuery: searchValue,
    onSearchChange: handleSearchInput,
    rowsPerPage: fetch.limit,
    onRowsPerPageChange: fetch.handleRowsPerPageChange,
    totalRecords: fetch.totalCount,
    currentPage: fetch.pageNumber,
    totalPages,
    onPageChange: fetch.setPageNumber,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    onEdit: drawer.openEditDrawer,
    onDelete: deleteDialog.handleDeleteClick,
    onAdd: drawer.openAddDrawer,
    isLoading: fetch.isLoading,
    error: fetch.error,
    isOpen: drawerState.isOpen,
    onClose: drawerState.onClose,
    validationSchema: drawerState.validationSchema,
    initialValues: drawerState.initialValues,
    onSubmit: drawerState.onSubmit,
    isEditing: drawerState.isEditing,
    deletingItem: deleteDialog.deletingItem,
    itemName: deleteDialog.deletingItem?.designationName || deleteDialog.deletingItem?.name || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    dependencyError,
    onCloseDependencyError: () => setDependencyError(false),
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
