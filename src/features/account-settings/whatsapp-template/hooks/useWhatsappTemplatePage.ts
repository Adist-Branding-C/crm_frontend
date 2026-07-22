import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useWhatsappTemplate, useWhatsappTemplateDrawer, useWhatsappTemplateDropdown, useWhatsappTemplateFilters, useWhatsappTemplateActions } from './index';
import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

export function useWhatsappTemplatePage() {
  const whatsappTemplate = useWhatsappTemplate();
  const drawer = useWhatsappTemplateDrawer();
  const dropdown = useWhatsappTemplateDropdown();
  const filters = useWhatsappTemplateFilters(whatsappTemplate.whatsappTemplateList);
  const actions = useWhatsappTemplateActions({ whatsappTemplate, drawer });

  const startIndex = (whatsappTemplate.pageNumber - 1) * whatsappTemplate.limit;
  const totalPages = useMemo(
    () => Math.ceil(whatsappTemplate.totalCount / whatsappTemplate.limit) || 1,
    [whatsappTemplate.totalCount, whatsappTemplate.limit],
  );

  const handleEditClick = useCallback((item: WhatsappTemplateItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: WhatsappTemplateItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  const { handleRowsPerPageChange: setRowsPerPage } = whatsappTemplate;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  return {
    whatsappTemplate,
    searchQuery: whatsappTemplate.searchQuery,
    handleSearchChange: whatsappTemplate.handleSearchChange,
    rowsPerPage: whatsappTemplate.limit,
    handleRowsPerPageChange,
    pageNumber: whatsappTemplate.pageNumber,
    setPageNumber: whatsappTemplate.setPageNumber,
    totalCount: whatsappTemplate.totalCount,
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
