import { useCallback } from 'react';
import { useTask, useTaskDrawer, useTaskDropdown, useTaskFilters, useTaskActions } from './index';
import type { TaskItem } from '../types/task.types';

export function useTaskPage() {
  const task = useTask();
  const drawer = useTaskDrawer();
  const dropdown = useTaskDropdown();
  const filters = useTaskFilters(task.taskList);
  const actions = useTaskActions({ task, drawer });

  const handleEditClick = useCallback((item: TaskItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: TaskItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    task,
    searchQuery: filters.searchQuery,
    setSearchQuery: filters.setSearchQuery,
    rowsPerPage: filters.rowsPerPage,
    setRowsPerPage: filters.setRowsPerPage,
    showDrawer: drawer.showAddDrawer || drawer.showEditDrawer,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    editingItem: drawer.editingItem,
    deletingItem: actions.deletingItem,
    filteredData: filters.filteredData,
    totalRecords: filters.totalRecords,
    drawerInitialValues: drawer.drawerInitialValues,
    handleAddClick: drawer.openAddDrawer,
    handleCloseDrawer: () => { drawer.closeAddDrawer(); drawer.closeEditDrawer(); },
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete: actions.handleConfirmDelete,
    handleCloseDeleteModal: actions.closeDeleteModal,
    handleSubmit: actions.handleSubmit,
    handleEditSubmit: actions.handleEditSubmit,
  };
}
