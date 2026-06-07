import { useCallback } from 'react';
import { useWorkMode, useWorkModeDrawer, useWorkModeDropdown, useWorkModeFilters, useWorkModeActions } from './index';
import type { WorkModeItem } from '../types/workMode.types';

export function useWorkModePage() {
  const workMode = useWorkMode();
  const drawer = useWorkModeDrawer();
  const dropdown = useWorkModeDropdown();
  const filters = useWorkModeFilters(workMode.workModeList);
  const actions = useWorkModeActions({ workMode, drawer });

  const handleEditClick = useCallback((item: WorkModeItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: WorkModeItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    workMode,
    searchQuery: filters.searchQuery,
    setSearchQuery: filters.setSearchQuery,
    rowsPerPage: filters.rowsPerPage,
    setRowsPerPage: filters.setRowsPerPage,
    showDrawer: drawer.showDrawer,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    editingItem: drawer.editingItem,
    deletingItem: actions.deletingItem,
    filteredData: filters.filteredData,
    totalRecords: filters.totalRecords,
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
