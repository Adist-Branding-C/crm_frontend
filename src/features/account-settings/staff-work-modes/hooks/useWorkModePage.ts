import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useWorkMode, useWorkModeDrawer, useWorkModeDropdown, useWorkModeFilters, useWorkModeActions } from './index';
import type { WorkModeItem } from '../types/workMode.types';

export function useWorkModePage() {
  const workMode = useWorkMode();
  const drawer = useWorkModeDrawer();
  const dropdown = useWorkModeDropdown();
  const filters = useWorkModeFilters(workMode.workModeList);
  const actions = useWorkModeActions({ workMode, drawer });

  const startIndex = (workMode.pageNumber - 1) * workMode.limit;
  const totalPages = useMemo(() => Math.ceil(workMode.totalCount / workMode.limit) || 1, [workMode.totalCount, workMode.limit]);

  const handleEditClick = useCallback((item: WorkModeItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: WorkModeItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  const { handleRowsPerPageChange: setRowsPerPage } = workMode;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  return {
    workMode,
    searchQuery: workMode.searchQuery,
    handleSearchChange: workMode.handleSearchChange,
    rowsPerPage: workMode.limit,
    handleRowsPerPageChange,
    pageNumber: workMode.pageNumber,
    setPageNumber: workMode.setPageNumber,
    totalCount: workMode.totalCount,
    startIndex,
    totalPages,
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
