import { useCallback } from 'react';
import { useWhatsappTemplate, useWhatsappTemplateDrawer, useWhatsappTemplateDropdown, useWhatsappTemplateFilters, useWhatsappTemplateActions } from './index';
import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

export function useWhatsappTemplatePage() {
  const whatsappTemplate = useWhatsappTemplate();
  const drawer = useWhatsappTemplateDrawer();
  const dropdown = useWhatsappTemplateDropdown();
  const filters = useWhatsappTemplateFilters(whatsappTemplate.whatsappTemplateList);
  const actions = useWhatsappTemplateActions({ whatsappTemplate, drawer });

  const handleEditClick = useCallback((item: WhatsappTemplateItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: WhatsappTemplateItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    whatsappTemplate,
    searchQuery: whatsappTemplate.searchQuery,
    handleSearchChange: whatsappTemplate.handleSearchChange,
    rowsPerPage: whatsappTemplate.limit,
    handleRowsPerPageChange: whatsappTemplate.handleRowsPerPageChange,
    pageNumber: whatsappTemplate.pageNumber,
    setPageNumber: whatsappTemplate.setPageNumber,
    totalCount: whatsappTemplate.totalCount,
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
