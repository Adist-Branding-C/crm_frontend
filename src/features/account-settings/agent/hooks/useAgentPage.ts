import { useFetchAgents } from './useFetchAgents';
import { useAgentSubmitHandlers } from './useAgentSubmitHandlers';
import { useAgentDrawer } from './useAgentDrawer';
import { useDesignationOptions } from './useDesignationOptions';
import { useDepartmentOptions } from './useDepartmentOptions';
import { useAgentDrawerState } from './useAgentDrawerState';
import { useDeleteAgentDialog } from './useDeleteAgentDialog';
import { useAgentDropdown } from './useAgentDropdown';
import { useSearchInput } from '../../../../shared/hooks/useSearchInput';
import { useToast } from '../../../../shared/hooks/useToast';

export function useAgentPage() {
  const fetch = useFetchAgents();
  const drawer = useAgentDrawer();
  const designation = useDesignationOptions();
  const department = useDepartmentOptions();
  const deleteDialog = useDeleteAgentDialog();
  const dropdown = useAgentDropdown();
  const toast = useToast();

  const handlers = useAgentSubmitHandlers(
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

  const drawerState = useAgentDrawerState(drawer, handlers);

  const { searchValue, handleSearchInput } = useSearchInput(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  return {
    data: fetch.agentList,
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
    error: fetch.error || '',
    isOpen: drawerState.isOpen,
    onClose: drawerState.onClose,
    validationSchema: drawerState.validationSchema,
    initialValues: drawerState.initialValues,
    onSubmit: drawerState.onSubmit,
    isEditing: drawerState.isEditing,
    designationOptions: designation.designationOptions,
    onFetchDesignations: designation.fetchDesignations,
    departmentOptions: department.departmentOptions,
    onFetchDepartments: department.fetchDepartments,
    deletingItem: deleteDialog.deletingItem,
    itemName: deleteDialog.deletingItem?.fullName || deleteDialog.deletingItem?.name || '',
    onConfirmDelete: handlers.handleConfirmDelete,
    onCloseDelete: deleteDialog.closeDeleteDialog,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    onCloseToast: () => toast.setShowToast(false),
  };
}
