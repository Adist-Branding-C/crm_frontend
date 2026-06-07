import { useCallback } from 'react';
import { useEmailTemplate, useEmailTemplateDrawer, useEmailTemplateDropdown, useEmailTemplateFilters, useEmailTemplateActions } from './index';
import type { EmailTemplateItem } from '../types/emailTemplate.types';

export function useEmailTemplatePage() {
  const emailTemplate = useEmailTemplate();
  const drawer = useEmailTemplateDrawer();
  const dropdown = useEmailTemplateDropdown();
  const filters = useEmailTemplateFilters(emailTemplate.emailTemplateList);
  const actions = useEmailTemplateActions({ emailTemplate, drawer });

  const handleEditClick = useCallback((item: EmailTemplateItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: EmailTemplateItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    emailTemplate,
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
