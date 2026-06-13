import { useCallback } from 'react';
import { useDealTask, useDealTaskDrawer, useDealTaskDropdown, useDealTaskFilters, useDealTaskActions } from './index';
import type { DealTaskItem } from '../types/dealTask.types';

export function useDealTaskPage() {
  const dealTask = useDealTask();
  const drawer = useDealTaskDrawer();
  const dropdown = useDealTaskDropdown();
  const filters = useDealTaskFilters(dealTask.dealTaskList);
  const actions = useDealTaskActions({ dealTask, drawer });

  const handleEditClick = useCallback((item: DealTaskItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: DealTaskItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    dealTask,
    searchQuery: dealTask.search,
    setSearchQuery: dealTask.handleSearchChange,
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
    staffOptions: dealTask.staffOptions,
    page: dealTask.page,
    limit: dealTask.limit,
    totalPages: dealTask.totalPages,
    totalItems: dealTask.totalItems,
    handlePageChange: dealTask.handlePageChange,
    handleLimitChange: dealTask.handleLimitChange,
  };
}
