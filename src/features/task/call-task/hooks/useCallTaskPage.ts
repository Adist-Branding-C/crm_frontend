import { useCallback } from 'react';
import { useCallTask, useCallTaskDrawer, useCallTaskDropdown, useCallTaskFilters, useCallTaskActions } from './index';
import type { CallTaskItem } from '../types/callTask.types';

export function useCallTaskPage() {
  const callTask = useCallTask();
  const drawer = useCallTaskDrawer();
  const dropdown = useCallTaskDropdown();
  const filters = useCallTaskFilters(callTask.callTaskList);
  const actions = useCallTaskActions({ callTask, drawer });

  const handleEditClick = useCallback((item: CallTaskItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: CallTaskItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    callTask,
    searchQuery: callTask.search,
    setSearchQuery: callTask.handleSearchChange,
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
    staffOptions: callTask.staffOptions,
    page: callTask.page,
    limit: callTask.limit,
    totalPages: callTask.totalPages,
    totalItems: callTask.totalItems,
    handlePageChange: callTask.handlePageChange,
    handleLimitChange: callTask.handleLimitChange,
  };
}
