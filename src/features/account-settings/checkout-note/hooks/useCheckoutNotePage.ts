import { useCallback } from 'react';
import { useCheckoutNote, useCheckoutNoteDrawer, useCheckoutNoteDropdown, useCheckoutNoteFilters, useCheckoutNoteActions } from './index';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

export function useCheckoutNotePage() {
  const checkoutNote = useCheckoutNote();
  const drawer = useCheckoutNoteDrawer();
  const dropdown = useCheckoutNoteDropdown();
  const filters = useCheckoutNoteFilters(checkoutNote.checkoutNoteList);
  const actions = useCheckoutNoteActions({ checkoutNote, drawer });

  const handleEditClick = useCallback((item: CheckoutNoteItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: CheckoutNoteItem) => {
    actions.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [actions.handleDeleteClick, dropdown.closeDropdown]);

  return {
    checkoutNote,
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
