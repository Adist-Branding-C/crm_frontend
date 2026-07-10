import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useLeadCrud } from './useLeadCrud';
import { useLeadPagination } from './useLeadPagination';
import { useLeadSort } from './useLeadSort';
import { useLeadFilters } from './useLeadFilters';
import { useLeadBulkActions } from './useLeadBulkActions';
import { useLeadToast } from './useLeadToast';
import { useLeadDropdownState } from './useLeadDropdownState';
import { INITIAL_FILTERS } from '../constants';
import type { Lead } from '../types';

export function useEnquiriesData() {
  const toast = useLeadToast();

  const crud = useLeadCrud(toast.showToastMessage);

  const { leads, total, totalPages, isLoading, deleteTargetLead, isDeleting, fetchLeads, handleDeleteClick: crudHandleDeleteClick, handleConfirmDelete, handleCloseDelete, refreshCurrentPage } = crud;

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');

  const filtersHook = useLeadFilters(fetchLeads, searchQueryRef, rowsPerPageRef);
  const { activeFiltersRef } = filtersHook;

  const sortHook = useLeadSort(fetchLeads, activeFiltersRef, searchQueryRef, rowsPerPageRef);

  const pagination = useLeadPagination(fetchLeads, activeFiltersRef, total);

  useEffect(() => {
    rowsPerPageRef.current = pagination.rowsPerPage;
    searchQueryRef.current = pagination.searchQuery;
  });

  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const sortDropdown = useLeadDropdownState();
  const actionsDropdown = useLeadDropdownState();

  const initalFetchDone = useRef(false);

  useEffect(() => {
    if (initalFetchDone.current) return;
    initalFetchDone.current = true;
    fetchLeads(1, 10, '', {});
  }, []);

  useEffect(() => {
    if (!selectedLead) return;
    const updated = leads.find(l => l.id === selectedLead.id);
    if (updated && updated.updatedAt !== selectedLead.updatedAt) {
      setSelectedLead(updated);
    }
  }, [leads, selectedLead]);

  const paginatedIds = useMemo(
    () => leads.map(item => item.id),
    [leads]
  );

  const { selectedIds, handleSelectAll, handleSelectRow, setSelectedIds } = useTableSelection();

  const handleDeleteClick = useCallback((lead: Lead) => {
    setActionMenuOpen(null);
    setActionMenuButtonRect(null);
    crudHandleDeleteClick(lead);
  }, [crudHandleDeleteClick]);

  const clearFilters = useCallback(() => {
    filtersHook.setFilters({ ...INITIAL_FILTERS, additionalFields: {} });
    filtersHook.setShowFilters(false);
    activeFiltersRef.current = {};
    pagination.setSearchQuery('');
    pagination.resetPage();
    sortHook.resetSort();
    fetchLeads(1, rowsPerPageRef.current, '', {});
  }, [filtersHook, pagination, sortHook, activeFiltersRef, fetchLeads, rowsPerPageRef]);

  const bulkActions = useLeadBulkActions({
    selectedIds,
    onRefresh: refreshCurrentPage,
    onShowToast: toast.showToastMessage,
    onClearSelection: setSelectedIds,
  });

  return {
    searchQuery: pagination.searchQuery,
    setSearchQuery: pagination.setSearchQuery,
    showFilters: filtersHook.showFilters,
    setShowFilters: filtersHook.setShowFilters,
    filters: filtersHook.filters,
    setFilters: filtersHook.setFilters,
    clearFilters,
    sortConfig: sortHook.sortConfig,
    handleSort: sortHook.handleSort,
    handleSortDesc: sortHook.handleSortDesc,
    handleSortAsc: sortHook.handleSortAsc,
    currentPage: pagination.currentPage,
    setCurrentPage: pagination.handleSetCurrentPage,
    rowsPerPage: pagination.rowsPerPage,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    totalPages,
    startIndex: pagination.startIndex,
    totalItems: pagination.totalItems,
    selectedIds,
    handleSelectAll,
    handleSelectRow,
    actionMenuOpen,
    setActionMenuOpen,
    actionMenuButtonRect,
    setActionMenuButtonRect,
    isDrawerOpen,
    setIsDrawerOpen,
    showSortDropdown: sortDropdown.isOpen,
    sortDropdownClosing: sortDropdown.isClosing,
    sortDropdownRef: sortDropdown.ref,
    setShowSortDropdown: sortDropdown.setIsOpen,
    closeSortDropdown: sortDropdown.close,
    showActionsDropdown: actionsDropdown.isOpen,
    actionsDropdownClosing: actionsDropdown.isClosing,
    actionsDropdownRef: actionsDropdown.ref,
    setShowActionsDropdown: actionsDropdown.setIsOpen,
    closeActionsDropdown: actionsDropdown.close,
    selectedLead,
    setSelectedLead,
    deleteTargetLead,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDelete,
    toastMessage: toast.toastMessage,
    toastType: toast.toastType,
    showToast: toast.showToast,
    setShowToast: toast.setShowToast,
    showToastMessage: toast.showToastMessage,
    handleApplyFilters: filtersHook.handleApplyFilters,
    paginatedData: leads,
    paginatedIds,
    isLoading,
    setRefreshKey: () => {},
    refreshCurrentPage,
    handleExportSelected: bulkActions.handleExportSelected,
    handleChangeStatusClick: bulkActions.handleChangeStatusClick,
    handleConfirmChangeStatus: bulkActions.handleConfirmChangeStatus,
    handleAssignStaffClick: bulkActions.handleAssignStaffClick,
    handleConfirmAssignStaff: bulkActions.handleConfirmAssignStaff,
    handleSendFollowUp: bulkActions.handleSendFollowUp,
    handleDuplicateLeadAction: bulkActions.handleDuplicateLeadAction,
    handleDeleteSelectedClick: bulkActions.handleDeleteSelectedClick,
    handleConfirmDeleteSelected: bulkActions.handleConfirmDeleteSelected,
    showChangeStatusModal: bulkActions.showChangeStatusModal,
    setShowChangeStatusModal: bulkActions.setShowChangeStatusModal,
    showAssignStaffModal: bulkActions.showAssignStaffModal,
    setShowAssignStaffModal: bulkActions.setShowAssignStaffModal,
    showDeleteSelectedModal: bulkActions.showDeleteSelectedModal,
    setShowDeleteSelectedModal: bulkActions.setShowDeleteSelectedModal,
    isProcessingSelected: bulkActions.isProcessingSelected,
  };
}
