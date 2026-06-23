import { useCallback } from 'react';
import { useBranch, useBranchDrawer, useBranchDropdown, useBranchFilters, useBranchActions } from './index';
import type { BranchItem } from '../types/branch.types';

export function useBranchPage() {
  const branchHook = useBranch();
  const drawer = useBranchDrawer();
  const dropdown = useBranchDropdown();
  const filters = useBranchFilters(branchHook.branchList);
  const actions = useBranchActions({ branch: branchHook, drawer });

  const handleEditClick = useCallback((item: BranchItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: BranchItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    branch: branchHook,
    searchQuery: branchHook.searchQuery,
    handleSearchChange: branchHook.handleSearchChange,
    rowsPerPage: branchHook.limit,
    handleRowsPerPageChange: branchHook.handleRowsPerPageChange,
    pageNumber: branchHook.pageNumber,
    setPageNumber: branchHook.setPageNumber,
    totalCount: branchHook.totalCount,
    showDrawer: drawer.showDrawer,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    editingItem: drawer.editingItem,
    deletingItem: actions.deletingItem,
    filteredData: filters.filteredData,
    drawerInitialValues: drawer.drawerInitialValues,
    handleAddClick: drawer.openAddDrawer,
    handleCloseDrawer: drawer.closeDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete: actions.handleConfirmDelete,
    handleCloseDeleteModal: actions.closeDeleteModal,
    handleSubmit: actions.handleSubmit,
    handleEditSubmit: actions.handleEditSubmit,
  };
}
