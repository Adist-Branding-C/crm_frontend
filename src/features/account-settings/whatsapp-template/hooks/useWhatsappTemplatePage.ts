import { useFetchWhatsappTemplates } from './useFetchWhatsappTemplates';
import { useWhatsappTemplateSubmitHandlers } from './useWhatsappTemplateSubmitHandlers';
import { useWhatsappTemplateDrawer } from './useWhatsappTemplateDrawer';
import { useWhatsappTemplateDrawerState } from './useWhatsappTemplateDrawerState';
import { useDeleteWhatsappTemplateDialog } from './useDeleteWhatsappTemplateDialog';
import { useWhatsappTemplateDropdown } from './useWhatsappTemplateDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useWhatsappTemplatePage() {
  const fetch = useFetchWhatsappTemplates();
  const drawer = useWhatsappTemplateDrawer();
  const deleteDialog = useDeleteWhatsappTemplateDialog();
  const dropdown = useWhatsappTemplateDropdown();
  const toast = useToast();

  const handlers = useWhatsappTemplateSubmitHandlers(
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

  const drawerState = useWhatsappTemplateDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.whatsappTemplateList,
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
    itemName: deleteDialog.deletingItem?.templateName || deleteDialog.deletingItem?.name || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
