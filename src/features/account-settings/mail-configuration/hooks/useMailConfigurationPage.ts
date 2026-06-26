import { useCallback } from 'react';
import { useMailConfigData, useMailConfiguration, useMailConfigurationDrawer, useMailConfigurationActions } from './index';
import type { MailConfigItem } from '../types';

export function useMailConfigurationPage() {
  const mailConfigData = useMailConfigData();
  const mailConfig = useMailConfiguration();
  const drawer = useMailConfigurationDrawer();
  const actions = useMailConfigurationActions({ mailConfig, drawer });

  const handleAddClick = useCallback(() => {
    mailConfigData.handleAddClick();
    drawer.openAddDrawer();
  }, [mailConfigData.handleAddClick, drawer.openAddDrawer]);

  const handleEditClick = useCallback((item: MailConfigItem) => {
    mailConfigData.handleEditClick(item);
    drawer.openEditDrawer(item);
    mailConfigData.setDropdownOpen(null);
  }, [mailConfigData.handleEditClick, drawer.openEditDrawer]);

  const handleDeleteClick = useCallback((item: MailConfigItem) => {
    mailConfigData.handleDeleteClick(item);
    actions.handleDeleteClick(item);
  }, [mailConfigData.handleDeleteClick, actions.handleDeleteClick]);

  const handleCloseDrawer = useCallback(() => {
    mailConfigData.handleCloseForm();
    drawer.closeDrawer();
  }, [mailConfigData.handleCloseForm, drawer.closeDrawer]);

  const handleConfirmDelete = useCallback(async () => {
    if (!mailConfigData.deletingItem) return;
    const success = await mailConfig.handleDeleteMailConfig(mailConfigData.deletingItem.id);
    if (success) {
      mailConfigData.setDeletingItem(null);
    }
  }, [mailConfigData.deletingItem, mailConfig.handleDeleteMailConfig]);

  return {
    mailConfig,
    mailConfigData,
    showDrawer: drawer.showDrawer,
    editingItem: drawer.editingItem,
    drawerInitialValues: drawer.drawerInitialValues,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCloseDrawer,
    handleSubmit: actions.handleSubmit,
    handleEditSubmit: actions.handleEditSubmit,
    handleConfirmDelete,
    handleCloseDeleteModal: () => mailConfigData.setDeletingItem(null),
    searchQuery: mailConfigData.searchQuery,
    setSearchQuery: mailConfigData.setSearchQuery,
    rowsPerPage: mailConfigData.rowsPerPage,
    setRowsPerPage: mailConfigData.setRowsPerPage,
    dropdownOpen: mailConfigData.dropdownOpen,
    setDropdownOpen: mailConfigData.setDropdownOpen,
    filteredData: mailConfigData.filteredData,
    deletingItem: mailConfigData.deletingItem,
    pageNumber: 1,
  };
}
