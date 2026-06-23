import { useCallback } from 'react';
import { useDesignation, useDesignationDrawer, useDesignationDropdown, useDesignationFilters, useDesignationActions } from './index';
import type { DesignationItem } from '../types/designation.types';

export function useDesignationPage() {
  const designation = useDesignation();
  const drawer = useDesignationDrawer();
  const dropdown = useDesignationDropdown();
  const filters = useDesignationFilters(designation.designationList);
  const actions = useDesignationActions({ designation, drawer });

  const handleEditClick = useCallback((item: DesignationItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: DesignationItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    designation,
    searchQuery: designation.searchQuery,
    handleSearchChange: designation.handleSearchChange,
    rowsPerPage: designation.limit,
    handleRowsPerPageChange: designation.handleRowsPerPageChange,
    pageNumber: designation.pageNumber,
    setPageNumber: designation.setPageNumber,
    totalCount: designation.totalCount,
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
