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
    searchQuery: checkoutNote.searchQuery,
    handleSearchChange: checkoutNote.handleSearchChange,
    rowsPerPage: checkoutNote.limit,
    handleRowsPerPageChange: checkoutNote.handleRowsPerPageChange,
    pageNumber: checkoutNote.pageNumber,
    setPageNumber: checkoutNote.setPageNumber,
    totalCount: checkoutNote.totalCount,
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
