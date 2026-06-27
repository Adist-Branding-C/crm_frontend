import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { leadDataService } from '../services/leadDataService';
import { mapApiToUI } from '../utils/leadMapper';
import { INITIAL_FILTERS, DEFAULT_ROWS_PER_PAGE } from '../constants';
import type { Lead, Filters } from '../types';
import type { SortConfig } from '../../../shared/types/sort';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

const DEFAULT_SORT: SortConfig = { key: 'createdAt', direction: SortDirection.DESC };

export function useEnquiriesData() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteTargetLead, setDeleteTargetLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [sortConfig, setSortConfig] = useState<SortConfig>(DEFAULT_SORT);
  const [refreshKey, setRefreshKey] = useState(0);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsDropdownRef = useRef<HTMLDivElement | null>(null);
  const requestSeqRef = useRef(0);
  const rowsPerPageRef = useRef(rowsPerPage);
  const searchQueryRef = useRef(searchQuery);
  const isLoadingRef = useRef(isLoading);
  const sortConfigRef = useRef(sortConfig);
  const activeFiltersRef = useRef<Record<string, string | number>>({});
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
    searchQueryRef.current = searchQuery;
    isLoadingRef.current = isLoading;
    sortConfigRef.current = sortConfig;
    currentPageRef.current = currentPage;
  });

  const fetchLeads = useCallback(async (page: number, limit: number, search: string, extraParams: Record<string, string | number> = {}) => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = { pageNumber: page, limit, ...extraParams };
      if (search) params.search = search;
      const response = await leadDataService.getLeads(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status) {
        setLeads(response.data.items.map(mapApiToUI));
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(response.data.pagination?.totalPages ?? 1);
      } else {
        setLeads([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setLeads([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initalFetchDone = useRef(false);

  useEffect(() => {
    if (initalFetchDone.current) return;
    initalFetchDone.current = true;
    setCurrentPage(1);
    fetchLeads(1, rowsPerPage, '', {});
  }, []);

  const prevSearchQuery = useRef(searchQuery);

  useEffect(() => {
    if (searchQuery === prevSearchQuery.current) return;
    prevSearchQuery.current = searchQuery;
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchLeads(1, rowsPerPageRef.current, searchQuery, activeFiltersRef.current);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchLeads]);

  const handleApplyFilters = useCallback(() => {
    const params: Record<string, string | number> = {};
    if (filters.leadType) params.leadType = filters.leadType;
    if (filters.leadStatus) params.leadStatusId = filters.leadStatus;
    if (filters.enquirySource) params.enquirySource = filters.enquirySource;
    if (filters.enquiryPurpose) params.enquiryPurpose = filters.enquiryPurpose;
    if (filters.assignedTo) params.assignedTo = filters.assignedTo;
    if (filters.location) params.location = filters.location;
    if (filters.dateRange.start && filters.dateRange.end) {
      params.startDate = filters.dateRange.start;
      params.endDate = filters.dateRange.end;
    }
    if (filters.filterByDate) params.dateFilterBy = filters.filterByDate;
    if (sortConfigRef.current.key) {
      params.sort_by = sortConfigRef.current.key;
      params.sort_order = sortConfigRef.current.direction.toUpperCase();
    }
    activeFiltersRef.current = params;
    setCurrentPage(1);
    setShowFilters(false);
    fetchLeads(1, rowsPerPageRef.current, searchQueryRef.current, params);
  }, [filters, fetchLeads]);

  const handleSetCurrentPage = useCallback((page: number | ((prev: number) => number)) => {
    if (isLoadingRef.current) return;
    const next = typeof page === 'function' ? page(currentPage) : page;
    setCurrentPage(next);
    fetchLeads(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [currentPage, fetchLeads]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLoadingRef.current) return;
    const val = Number(e.target.value);
    setRowsPerPage(val);
    setCurrentPage(1);
    fetchLeads(1, val, searchQueryRef.current, activeFiltersRef.current);
  }, [fetchLeads]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedIds = useMemo(
    () => leads.map(item => item.id),
    [leads]
  );

  const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();

  const closeSortDropdown = useCallback(() => {
    setSortDropdownClosing(true);
    setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
  }, []);

  const closeActionsDropdown = useCallback(() => {
    setActionsDropdownClosing(true);
    setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
  }, []);

  const handleSort = useCallback((key: string) => {
    const direction = sortConfigRef.current.key === key && sortConfigRef.current.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    const newConfig: SortConfig = { key, direction };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: direction.toUpperCase() };
    setCurrentPage(1);
    fetchLeads(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [fetchLeads]);

  const handleSortDesc = useCallback((key: string) => {
    const newConfig: SortConfig = { key, direction: SortDirection.DESC };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: 'DESC' };
    setCurrentPage(1);
    fetchLeads(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [fetchLeads]);

  const handleSortAsc = useCallback((key: string) => {
    const newConfig: SortConfig = { key, direction: SortDirection.ASC };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: 'ASC' };
    setCurrentPage(1);
    fetchLeads(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [fetchLeads]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setSortConfig(DEFAULT_SORT);
    setCurrentPage(1);
    setShowFilters(false);
    activeFiltersRef.current = {};
    fetchLeads(1, rowsPerPageRef.current, '', {});
  }, [fetchLeads]);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  }, []);

  const handleDeleteClick = useCallback((lead: Lead) => {
    setDeleteTargetLead(lead);
    setActionMenuOpen(null);
    setActionMenuButtonRect(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTargetLead || isDeleting) return;
    setIsDeleting(true);
    try {
      await leadDataService.deleteLead(deleteTargetLead.id);
      showToastMessage('Lead deleted successfully', 'success');
      setDeleteTargetLead(null);
      fetchLeads(currentPageRef.current, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
    } catch {
      showToastMessage('Failed to delete lead', 'error');
      setDeleteTargetLead(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTargetLead, isDeleting, fetchLeads, showToastMessage]);

  const handleCloseDelete = useCallback(() => {
    if (isDeleting) return;
    setDeleteTargetLead(null);
  }, [isDeleting]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
        }
      }
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target as Node)) {
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
        }
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSortDropdown, showActionsDropdown]);

  return {
    searchQuery, setSearchQuery,
    showFilters, setShowFilters,
    filters, setFilters, clearFilters,
    sortConfig, handleSort, handleSortDesc, handleSortAsc,
    currentPage, setCurrentPage: handleSetCurrentPage,
    rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
    totalItems: total,
    selectedIds, handleSelectAll, handleSelectRow,
    actionMenuOpen, setActionMenuOpen,
    actionMenuButtonRect, setActionMenuButtonRect,
    isDrawerOpen, setIsDrawerOpen,
    showSortDropdown, setShowSortDropdown,
    showActionsDropdown, setShowActionsDropdown,
    sortDropdownClosing, setSortDropdownClosing,
    actionsDropdownClosing, setActionsDropdownClosing,
    selectedLead, setSelectedLead,
    deleteTargetLead, isDeleting,
    handleDeleteClick, handleConfirmDelete, handleCloseDelete,
    toastMessage, toastType, showToast, setShowToast,
    showToastMessage,
    sortDropdownRef, actionsDropdownRef,
    closeSortDropdown, closeActionsDropdown,
    handleApplyFilters,
    paginatedData: leads,
    paginatedIds,
    isLoading,
    setRefreshKey,
  };
}
