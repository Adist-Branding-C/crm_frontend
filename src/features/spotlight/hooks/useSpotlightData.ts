import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useDropdownMenu } from '../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useLeadFilterOptions } from '../../enquiries/hooks/useLeadFilterOptions';
import { useSpotlightFilters } from './useSpotlightFilters';
import { useSpotlightSort } from './useSpotlightSort';
import { useSpotlightPagination } from './useSpotlightPagination';
import { useSpotlightLeadsFetch } from './useSpotlightLeadsFetch';
import { useSpotlightExport } from './useSpotlightExport';
import { SpotlightRequestMapper } from '../mappers/spotlightRequest.mapper';
import type { SpotlightLead, SpotlightFilters } from '../types';
import type { SortDirection } from '../../../shared/constants/enums/sortDirection';

const SEARCH_DEBOUNCE_MS = 500;

export function useSpotlightData() {
  const [selectedLead, setSelectedLead] = useState<SpotlightLead | null>(null);
  const [committedSearch, setCommittedSearch] = useState('');

  const search = useDebouncedSearch(setCommittedSearch, SEARCH_DEBOUNCE_MS);
  const filtersHook = useSpotlightFilters();
  const sort = useSpotlightSort();
  const pagination = useSpotlightPagination();
  const fetch = useSpotlightLeadsFetch();
  const exportHook = useSpotlightExport(fetch.setError);
  const dropdown = useDropdownMenu<number>();
  const { selectedIds, handleSelectAll, handleSelectRow } =
    useTableSelection<number>();
  const {
    typeOptions,
    sourceOptions,
    purposeOptions,
    staffOptions,
    statusOptions,
    isLoading: filterOptionsLoading,
  } = useLeadFilterOptions();

  const filterOptions = useMemo(
    () => ({
      leadTypes: typeOptions,
      sources: sourceOptions,
      purposes: purposeOptions,
      statuses: statusOptions,
      agents: staffOptions,
    }),
    [typeOptions, sourceOptions, purposeOptions, statusOptions, staffOptions],
  );

  useEffect(() => {
    pagination.resetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [committedSearch]);

  const requestParams = useMemo(
    () =>
      SpotlightRequestMapper.toParams(
        pagination.currentPage,
        pagination.rowsPerPage,
        committedSearch,
        sort.sortConfig,
        filtersHook.filters,
      ),
    [
      pagination.currentPage,
      pagination.rowsPerPage,
      committedSearch,
      sort.sortConfig,
      filtersHook.filters,
    ],
  );

  useEffect(() => {
    fetch.fetchLeads(requestParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams]);

  const refetch = useCallback(() => {
    fetch.fetchLeads(requestParams);
  }, [fetch.fetchLeads, requestParams]);

  const handleSort = useCallback(
    (key: string) => {
      sort.handleSort(key);
      pagination.resetPage();
    },
    [sort.handleSort, pagination.resetPage],
  );

  const selectSort = useCallback(
    (key: string, direction: SortDirection) => {
      sort.selectSort(key, direction);
      pagination.resetPage();
    },
    [sort.selectSort, pagination.resetPage],
  );

  const handleFilterChange = useCallback(
    (newFilters: SpotlightFilters) => {
      filtersHook.setFilters(newFilters);
      pagination.resetPage();
    },
    [filtersHook.setFilters, pagination.resetPage],
  );

  const handleClearFilters = useCallback(() => {
    filtersHook.clearFilters();
    filtersHook.closeFilters();
    pagination.resetPage();
  }, [filtersHook, pagination.resetPage]);

  const onToggleMenu = useCallback(
    (id: number, open: boolean) => {
      dropdown.toggleDropdown(open ? id : null);
    },
    [dropdown.toggleDropdown],
  );

  const handleViewLead = useCallback(
    (lead: SpotlightLead) => {
      dropdown.closeDropdown();
      setSelectedLead(lead);
    },
    [dropdown.closeDropdown],
  );

  const closeLeadDetail = useCallback(() => setSelectedLead(null), []);

  const exportParams = useMemo(
    () =>
      SpotlightRequestMapper.toExportParams(
        committedSearch,
        sort.sortConfig,
        filtersHook.filters,
      ),
    [committedSearch, sort.sortConfig, filtersHook.filters],
  );

  const handleExport = useCallback(
    () => exportHook.handleExport(exportParams),
    [exportHook.handleExport, exportParams],
  );

  const paginatedIds = useMemo(
    () => fetch.data.map((item) => item.id),
    [fetch.data],
  );

  return {
    searchQuery: search.searchValue,
    setSearchQuery: search.handleSearchChange,
    showFilters: filtersHook.showFilters,
    toggleFilters: filtersHook.toggleFilters,
    closeFilters: filtersHook.closeFilters,
    filters: filtersHook.filters,
    setFilters: handleFilterChange,
    clearFilters: handleClearFilters,
    filterOptions,
    filterOptionsLoading,
    sortConfig: sort.sortConfig,
    showSortDropdown: sort.showSortDropdown,
    toggleSortDropdown: sort.toggleSortDropdown,
    handleSort,
    selectSort,
    currentPage: pagination.currentPage,
    setCurrentPage: pagination.setCurrentPage,
    rowsPerPage: pagination.rowsPerPage,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    startIndex: pagination.startIndex,
    totalPages: fetch.totalPages,
    totalRecords: fetch.totalRecords,
    selectedIds,
    handleSelectAll,
    handleSelectRow,
    actionMenuOpen: dropdown.dropdownOpen,
    onToggleMenu,
    selectedLead,
    closeLeadDetail,
    handleViewLead,
    paginatedData: fetch.data,
    paginatedIds,
    loading: fetch.loading,
    error: fetch.error,
    refetch,
    handleExport,
    isExporting: exportHook.isExporting,
  };
}
