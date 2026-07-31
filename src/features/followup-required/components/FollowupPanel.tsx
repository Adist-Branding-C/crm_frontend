import { useState, useEffect, useCallback } from 'react';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import ListToolbar from '../../../shared/components/table/ListToolbar';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useLeadFilterOptions } from '../../enquiries/hooks/useLeadFilterOptions';
import { COLUMNS, SORT_OPTIONS } from '../constants';
import { useFollowupFilters } from '../hooks/useFollowupFilters';
import { useFollowupSort } from '../hooks/useFollowupSort';
import { useFollowupDrawer } from '../hooks/useFollowupDrawer';
import { useFollowupFetch } from '../hooks/useFollowupFetch';
import { useFollowupStatistics } from '../hooks/useFollowupStatistics';
import FollowupFilters from './FollowupFilters';
import FollowupStatCards from './FollowupStatCards';
import FollowupTable from './FollowupTable';
import FollowupPagination from './FollowupPagination';
import type { FollowupBucket } from '../types';

/**
 * Self-contained follow-up list: stat cards, search/filter/sort toolbar,
 * table, pagination, and the lead-detail drawer. Owns all of its own data
 * fetching, so it can be dropped into any page with no props - mirrors
 * SpotlightPanel (features/spotlight/components/SpotlightPanel.tsx).
 *
 * Used by:
 * - FollowupRequiredPage (its dedicated route).
 * - EnquiriesPage (the "Follow Ups" header toggle, alongside Spotlight).
 */
const FollowupPanel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [committedSearch, setCommittedSearch] = useState('');
  const [activeBucket, setActiveBucket] = useState<FollowupBucket | null>(null);

  const filtersState = useFollowupFilters();
  const sortState = useFollowupSort();
  const drawerState = useFollowupDrawer();
  const { data, total, totalPages, isLoading, error, fetchFollowupLeads } = useFollowupFetch();
  const statistics = useFollowupStatistics();

  const handleBucketClick = useCallback((bucket: FollowupBucket | null) => {
    setActiveBucket((prev) => (prev === bucket ? null : bucket));
    setCurrentPage(1);
  }, []);

  const handleCommittedSearch = useCallback((value: string) => {
    setCurrentPage(1);
    setCommittedSearch(value.trim());
  }, []);

  const {
    searchValue: searchQuery,
    handleSearchChange: setSearchQuery,
  } = useDebouncedSearch(handleCommittedSearch);


  useEffect(() => {
    fetchFollowupLeads(
      currentPage,
      rowsPerPage,
      committedSearch,
      filtersState.appliedFilters,
      sortState.sortConfig,
      activeBucket,
    );
  }, [
    currentPage,
    rowsPerPage,
    committedSearch,
    filtersState.appliedFilters,
    sortState.sortConfig,
    activeBucket,
    fetchFollowupLeads,
  ]);

  // A filter/search change can leave currentPage past the new last page
  // (e.g. narrowing results while on page 5) - snap back into range.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const applyFilters = () => {
    const hasChanged = filtersState.applyFilters();
    if (hasChanged) {
      setCurrentPage(1);
    }
  };

  const clearFilters = () => {
    filtersState.clearFilters();
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    sortState.handleSort(key);
    setCurrentPage(1);
  };

  const refresh = useCallback(
    () =>
      fetchFollowupLeads(
        currentPage,
        rowsPerPage,
        committedSearch,
        filtersState.appliedFilters,
        sortState.sortConfig,
        activeBucket,
      ),
    [
      currentPage,
      rowsPerPage,
      committedSearch,
      filtersState.appliedFilters,
      sortState.sortConfig,
      activeBucket,
      fetchFollowupLeads,
    ],
  );

  const refreshAll = useCallback(() => {
    refresh();
    statistics.refetch();
  }, [refresh, statistics]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const {
    typeOptions,
    sourceOptions,
    staffOptions,
    statusOptions,
    isLoading: isLoadingFilterOptions,
    error: filterOptionsError,
  } = useLeadFilterOptions();

  return (
    <>
      <FollowupStatCards
        statistics={statistics.data}
        isLoading={statistics.isLoading}
        activeBucket={activeBucket}
        onBucketClick={handleBucketClick}
      />

      <ListToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={filtersState.showFilters}
        onToggleFilters={() => filtersState.setShowFilters(!filtersState.showFilters)}
        sortConfig={sortState.sortConfig}
        onSort={(key) => {
          handleSort(key);
          sortState.setShowSortDropdown(false);
        }}
        showSortDropdown={sortState.showSortDropdown}
        onToggleSortDropdown={() => sortState.setShowSortDropdown(!sortState.showSortDropdown)}
        sortOptions={SORT_OPTIONS}
      />

      {filtersState.showFilters && (
        <FollowupFilters
          filters={filtersState.filters}
          typeOptions={typeOptions}
          statusOptions={statusOptions}
          sourceOptions={sourceOptions}
          staffOptions={staffOptions}
          isLoadingFilterOptions={isLoadingFilterOptions}
          filterOptionsError={filterOptionsError}
          onFilterChange={filtersState.setFilters}
          onApply={applyFilters}
          onClear={clearFilters}
        />
      )}

      <FollowupTable
        data={data}
        columns={COLUMNS}
        sortConfig={sortState.sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        error={error}
        onRetry={refresh}
        onViewLead={drawerState.handleViewLead}
      />

      <FollowupPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        rowsPerPage={rowsPerPage}
        totalItems={total}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <LeadDetailDrawer
        lead={drawerState.selectedLead}
        isOpen={!!drawerState.selectedLead && drawerState.isDrawerOpen}
        onClose={drawerState.handleCloseDrawer}
        onLeadUpdated={refreshAll}
        onFieldSaved={drawerState.updateSelectedLead}
      />
    </>
  );
};

export default FollowupPanel;
