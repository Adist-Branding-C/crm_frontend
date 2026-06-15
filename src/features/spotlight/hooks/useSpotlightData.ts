import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { spotlightService } from '../services/SpotlightService';
import { INITIAL_FILTERS } from '../constants';
import { mapApiLeadToDisplay } from '../constants/leadMappers';
import { buildFilterOptions } from '../utils/buildFilterOptions';
import type { SpotlightLead, SpotlightLeadApi, SpotlightFilters, SpotlightRequestParams } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

export function useSpotlightData() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: SortDirection }>({ key: null, direction: SortDirection.ASC });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [selectedLead, setSelectedLead] = useState<SpotlightLead | null>(null);
  const [filters, setFilters] = useState<SpotlightFilters>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<SpotlightLead[]>([]);
  const [rawItems, setRawItems] = useState<SpotlightLeadApi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const initialRender = useRef(true);
  const latestRequestId = useRef(0);

  // Debounce search query before sending to API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchLeads = useCallback(async (params: SpotlightRequestParams) => {
    const requestId = ++latestRequestId.current;
    setLoading(true);
    setError(null);
    try {
      const response = await spotlightService.getLeads(params);
      if (requestId !== latestRequestId.current) return;
      if (response.status && response.data) {
        const items = response.data.items || [];
        setRawItems(items);
        setData(items.map(mapApiLeadToDisplay));
        setTotalRecords(response.data.total || 0);
        setTotalPages(response.data.total_pages || 1);
      } else {
        setRawItems([]);
        setData([]);
        setTotalRecords(0);
        setTotalPages(1);
        setError(response.message || 'Failed to fetch leads');
      }
    } catch (err: unknown) {
      if (requestId !== latestRequestId.current) return;
      setRawItems([]);
      setData([]);
      setTotalRecords(0);
      setTotalPages(1);
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch leads');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      if (requestId !== latestRequestId.current) return;
      setLoading(false);
    }
  }, []);

  // Build request params from current state
  const requestParams = useMemo<SpotlightRequestParams>(() => {
    const params: SpotlightRequestParams = {
      pageNumber: currentPage,
      limit: rowsPerPage,
    };

    if (debouncedSearch) params.search = debouncedSearch;

    if (sortConfig.key) {
      params.sort_by = sortConfig.key;
      params.sort_order = sortConfig.direction.toUpperCase();
    }

    if (filters.leadTypeId) params.leadTypeId = filters.leadTypeId;
    if (filters.enquirySource) params.enquirySource = filters.enquirySource;
    if (filters.enquiryPurpose) params.enquiryPurpose = filters.enquiryPurpose;
    if (filters.leadStatusId) params.leadStatusId = filters.leadStatusId;
    if (filters.assignedTo) params.assignedTo = filters.assignedTo;
    if (filters.location) params.location = filters.location;
    if (filters.dateRange.start) params.startDate = filters.dateRange.start;
    if (filters.dateRange.end) params.endDate = filters.dateRange.end;
    if (filters.filterByDate) params.dateFilterBy = filters.filterByDate;

    return params;
  }, [currentPage, rowsPerPage, debouncedSearch, sortConfig, filters]);

  // Fetch when request params change
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
    fetchLeads(requestParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams]);

  const filterOptions = useMemo(() => buildFilterOptions(rawItems), [rawItems]);

  const paginatedIds = useMemo(
    () => data.map(item => item.id),
    [data]
  );

  const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    }));
    setCurrentPage(1);
  }, []);

  const handleSortDirection = useCallback((key: string, direction: SortDirection) => {
    setSortConfig({ key, direction });
    setCurrentPage(1);
  }, []);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((newFilters: SpotlightFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ ...INITIAL_FILTERS });
    setCurrentPage(1);
    setShowFilters(false);
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;

  return {
    searchQuery, setSearchQuery,
    showFilters, setShowFilters,
    filters, setFilters: handleFilterChange, clearFilters,
    sortConfig, handleSort, handleSortDirection,
    setSortConfig,
    currentPage, setCurrentPage,
    rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
    selectedIds, handleSelectAll, handleSelectRow,
    actionMenuOpen, setActionMenuOpen,
    showSortDropdown, setShowSortDropdown,
    showActionsDropdown, setShowActionsDropdown,
    selectedLead, setSelectedLead,
    paginatedData: data, paginatedIds,
    loading, error, totalRecords,
    filterOptions,
  };
}
