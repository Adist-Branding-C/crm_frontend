import { useCallback } from 'react';
import { useCampaignTask, useCampaignTaskDrawer, useCampaignTaskDropdown, useCampaignTaskFilters, useCampaignTaskActions } from './index';
import type { CampaignTaskItem } from '../types/campaignTask.types';

export function useCampaignTaskPage() {
  const campaignTask = useCampaignTask();
  const drawer = useCampaignTaskDrawer();
  const dropdown = useCampaignTaskDropdown();
  const filters = useCampaignTaskFilters(campaignTask.campaignTaskList);
  const actions = useCampaignTaskActions({ campaignTask, drawer });

  const handleEditClick = useCallback((item: CampaignTaskItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: CampaignTaskItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    campaignTask,
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
