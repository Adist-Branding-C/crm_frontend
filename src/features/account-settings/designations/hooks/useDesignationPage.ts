import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useDesignation, useDesignationDrawer, useDesignationDropdown, useDesignationFilters, useDesignationActions } from './index';
import type { DesignationItem } from '../types/designation.types';

export function useDesignationPage() {
  const designation = useDesignation();
  const drawer = useDesignationDrawer();
  const dropdown = useDesignationDropdown();
  const filters = useDesignationFilters(designation.designationList);
  const actions = useDesignationActions({ designation, drawer });

  const startIndex = (designation.pageNumber - 1) * designation.limit;
  const totalPages = useMemo(
    () => Math.ceil(designation.totalCount / designation.limit) || 1,
    [designation.totalCount, designation.limit]
  );

  const handleEditClick = useCallback((item: DesignationItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: DesignationItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  const { handleRowsPerPageChange: setRowsPerPage } = designation;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  return {
    designation,
    searchQuery: designation.searchQuery,
    handleSearchChange: designation.handleSearchChange,
    rowsPerPage: designation.limit,
    handleRowsPerPageChange,
    pageNumber: designation.pageNumber,
    setPageNumber: designation.setPageNumber,
    totalCount: designation.totalCount,
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
