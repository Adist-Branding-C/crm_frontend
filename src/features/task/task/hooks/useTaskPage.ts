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
    searchQuery: task.search,
    setSearchQuery: task.handleSearchChange,
    showDrawer: drawer.showAddDrawer || drawer.showEditDrawer,
    dropdownOpen: dropdown.dropdownOpen,
    onToggleDropdown: dropdown.toggleDropdown,
    editingItem: drawer.editingItem,
    deletingItem: actions.deletingItem,
    filteredData: filters.filteredData,
    drawerInitialValues: drawer.drawerInitialValues,
    handleAddClick: drawer.openAddDrawer,
    handleCloseDrawer: () => { drawer.closeAddDrawer(); drawer.closeEditDrawer(); },
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete: actions.handleConfirmDelete,
    handleCloseDeleteModal: actions.closeDeleteModal,
    handleSubmit: actions.handleSubmit,
    handleEditSubmit: actions.handleEditSubmit,
    categoryOptions: task.categoryOptions,
    staffOptions: task.staffOptions,
    page: task.page,
    limit: task.limit,
    totalPages: task.totalPages,
    totalItems: task.totalItems,
    handlePageChange: task.handlePageChange,
    handleLimitChange: task.handleLimitChange,
  };
}
