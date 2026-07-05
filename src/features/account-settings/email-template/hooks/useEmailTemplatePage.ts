import { useFetchEmailTemplates } from './useFetchEmailTemplates';
import { useEmailTemplateSubmitHandlers } from './useEmailTemplateSubmitHandlers';
import { useEmailTemplateDrawer } from './useEmailTemplateDrawer';
import { useEmailTemplateDrawerState } from './useEmailTemplateDrawerState';
import { useDeleteEmailTemplateDialog } from './useDeleteEmailTemplateDialog';
import { useEmailTemplateDropdown } from './useEmailTemplateDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useEmailTemplatePage() {
  const fetch = useFetchEmailTemplates();
  const drawer = useEmailTemplateDrawer();
  const deleteDialog = useDeleteEmailTemplateDialog();
  const dropdown = useEmailTemplateDropdown();
  const toast = useToast();

  const handlers = useEmailTemplateSubmitHandlers(
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

  const drawerState = useEmailTemplateDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.emailTemplateList,
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
    itemName: deleteDialog.deletingItem?.templateName || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
