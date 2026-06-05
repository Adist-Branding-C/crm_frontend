import { useCallback } from 'react';
import { useAgent, useAgentDrawer, useAgentDropdown, useAgentFilters, useAgentActions } from './index';
import type { AgentItem } from '../types/agent.types';

export function useAgentPage() {
  const agent = useAgent();
  const drawer = useAgentDrawer();
  const dropdown = useAgentDropdown();
  const filters = useAgentFilters(agent.agentList);
  const actions = useAgentActions({ agent, drawer });

  const handleEditClick = useCallback((item: AgentItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: AgentItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    agent,
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
