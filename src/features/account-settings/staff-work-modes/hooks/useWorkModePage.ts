import { useFetchWorkModes } from './useFetchWorkModes';
import { useWorkModeSubmitHandlers } from './useWorkModeSubmitHandlers';
import { useWorkModeDrawer } from './useWorkModeDrawer';
import { useWorkModeDrawerState } from './useWorkModeDrawerState';
import { useDeleteWorkModeDialog } from './useDeleteWorkModeDialog';
import { useWorkModeDropdown } from './useWorkModeDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useWorkModePage() {
  const fetch = useFetchWorkModes();
  const drawer = useWorkModeDrawer();
  const deleteDialog = useDeleteWorkModeDialog();
  const dropdown = useWorkModeDropdown();
  const toast = useToast();

  const handlers = useWorkModeSubmitHandlers(
    {
      onAddSuccess: drawer.closeDrawer,
      onEditSuccess: drawer.closeDrawer,
      onDeleteSuccess: deleteDialog.closeDeleteDialog,
      editingItem: drawer.editingItem,
      deletingItem: deleteDialog.deletingItem,
    },
    fetch,
    toast,
  );

  const drawerState = useWorkModeDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.workModeList,
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
    itemName: deleteDialog.deletingItem?.workModeName || deleteDialog.deletingItem?.name || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
