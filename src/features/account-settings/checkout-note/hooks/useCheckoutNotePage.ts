import { useFetchCheckoutNotes } from './useFetchCheckoutNotes';
import { useCheckoutNoteSubmitHandlers } from './useCheckoutNoteSubmitHandlers';
import { useCheckoutNoteDrawer } from './useCheckoutNoteDrawer';
import { useCheckoutNoteDrawerState } from './useCheckoutNoteDrawerState';
import { useDeleteCheckoutNoteDialog } from './useDeleteCheckoutNoteDialog';
import { useCheckoutNoteDropdown } from './useCheckoutNoteDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useCheckoutNotePage() {
  const fetch = useFetchCheckoutNotes();
  const drawer = useCheckoutNoteDrawer();
  const deleteDialog = useDeleteCheckoutNoteDialog();
  const dropdown = useCheckoutNoteDropdown();
  const toast = useToast();

  const handlers = useCheckoutNoteSubmitHandlers(
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

  const drawerState = useCheckoutNoteDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.checkoutNoteList,
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
    itemName: deleteDialog.deletingItem?.title || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
