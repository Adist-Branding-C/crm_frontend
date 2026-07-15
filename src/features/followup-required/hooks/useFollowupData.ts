import { useState, useCallback, useRef, useEffect } from 'react';
import { followupService } from '../services/followupService';
import { mapApiItemToFollowupLead } from '../utils/followupLeadMapper';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { INITIAL_FILTERS } from '../constants';
import type {
  FollowupLead,
  Filters,
  SortConfig,
  GetFollowupLeadsParams,
} from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

const SORT_KEY_TO_API: Record<string, GetFollowupLeadsParams['sort_by']> = {
  name: 'name',
  createdAt: 'createdAt',
  nextFollowUp: 'nextFollowUp',
};

/**
 * Fetch-triggering state (currentPage, rowsPerPage, committedSearch, filters,
 * sortConfig) only ever changes together with an explicit page reset where
 * needed - filters is the applied set (only written by applyFilters/
 * clearFilters), separate from draftFilters (bound to the panel's controlled
 * inputs while the user is still adjusting them). This mirrors the
 * stage-then-apply pattern already used by useLeadFilters/useLeadSearch, so a
 * filter/search change can never fire a fetch against a stale page number.
 */
export const useFollowupData = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: SortDirection.ASC,
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FollowupLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(INITIAL_FILTERS);
  const [filters, setAppliedFilters] = useState<Filters>(INITIAL_FILTERS);
  const [committedSearch, setCommittedSearch] = useState('');

  const [data, setData] = useState<FollowupLead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestSeqRef = useRef(0);

  const fetchFollowupLeads = useCallback(async () => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const params: GetFollowupLeadsParams = {
        pageNumber: currentPage,
        limit: rowsPerPage,
      };
      if (committedSearch) params.search = committedSearch;
      if (filters.type) params.leadType = filters.type;
      if (filters.status) params.leadStatusId = filters.status;
      if (filters.source) params.enquirySource = filters.source;
      if (filters.assignedTo) params.assignedTo = filters.assignedTo;
      if (filters.dateRange.start) params.startDate = filters.dateRange.start;
      if (filters.dateRange.end) params.endDate = filters.dateRange.end;
      const sortBy = sortConfig.key
        ? SORT_KEY_TO_API[sortConfig.key]
        : undefined;
      if (sortBy) {
        params.sort_by = sortBy;
        params.sort_order =
          sortConfig.direction === SortDirection.DESC ? 'DESC' : 'ASC';
      }

      const response = await followupService.getFollowupLeads(params);
      if (requestSeq !== requestSeqRef.current) return;

      if (response.status && response.data) {
        const newTotalPages = response.data.pagination?.total_pages || 1;
        setData(response.data.items.map(mapApiItemToFollowupLead));
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(newTotalPages);
        // Self-healing invariant: if the page we just requested no longer
        // exists (e.g. an in-drawer edit removed enough leads from the due
        // list that the last page a user was on is now out of range), snap
        // back to the last valid page. currentPage is a fetch dependency, so
        // this triggers one corrective re-fetch rather than leaving the UI
        // showing an empty table against an impossible "page X of Y" state.
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }
      } else {
        setData([]);
        setTotal(0);
        setTotalPages(1);
        setError(response.message || 'Failed to load follow-up leads');
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setData([]);
      setTotal(0);
      setTotalPages(1);
      setError('Failed to load follow-up leads');
    } finally {
      if (requestSeq === requestSeqRef.current) setIsLoading(false);
    }
  }, [currentPage, rowsPerPage, committedSearch, filters, sortConfig]);

  useEffect(() => {
    fetchFollowupLeads();
  }, [fetchFollowupLeads]);

  const handleCommittedSearch = useCallback((value: string) => {
    setCurrentPage(1);
    setCommittedSearch(value.trim());
  }, []);

  const {
    searchValue: searchQuery,
    handleSearchChange: setSearchQuery,
    resetSearch,
  } = useDebouncedSearch(handleCommittedSearch);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    }));
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const applyFilters = () => {
    const hasChanged = JSON.stringify(draftFilters) !== JSON.stringify(filters);
    if (hasChanged) {
      setAppliedFilters(draftFilters);
      setCurrentPage(1);
    }
    setShowFilters(false);
  };

  const clearFilters = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleViewLead = (row: FollowupLead) => {
    setSelectedLead(row);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  return {
    searchQuery,
    setSearchQuery,
    resetSearch,
    showFilters,
    setShowFilters,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    sortConfig,
    showSortDropdown,
    setShowSortDropdown,
    selectedLead,
    isDrawerOpen,
    filters: draftFilters,
    setFilters: setDraftFilters,
    data,
    total,
    totalPages,
    startIndex,
    isLoading,
    error,
    handleSort,
    handleRowsPerPageChange,
    applyFilters,
    clearFilters,
    handleViewLead,
    handleCloseDrawer,
    refresh: fetchFollowupLeads,
  };
};
