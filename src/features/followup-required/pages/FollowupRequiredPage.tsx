import { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import ListToolbar from '../../../shared/components/table/ListToolbar';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useLeadFilterOptions } from '../../enquiries/hooks/useLeadFilterOptions';
import { COLUMNS, SORT_OPTIONS } from '../constants';
import { useFollowupFilters } from '../hooks/useFollowupFilters';
import { useFollowupSort } from '../hooks/useFollowupSort';
import { useFollowupDrawer } from '../hooks/useFollowupDrawer';
import { useFollowupFetch } from '../hooks/useFollowupFetch';
import FollowupFilters from '../components/FollowupFilters';
import FollowupTable from '../components/FollowupTable';
import FollowupPagination from '../components/FollowupPagination';
import './FollowupRequiredPage.css';

const FollowupRequiredPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [committedSearch, setCommittedSearch] = useState('');

  const filtersState = useFollowupFilters();
  const sortState = useFollowupSort();
  const drawerState = useFollowupDrawer();
  const { data, total, totalPages, isLoading, error, fetchFollowupLeads } = useFollowupFetch();

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
    );
  }, [
    currentPage,
    rowsPerPage,
    committedSearch,
    filtersState.appliedFilters,
    sortState.sortConfig,
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
      ),
    [
      currentPage,
      rowsPerPage,
      committedSearch,
      filtersState.appliedFilters,
      sortState.sortConfig,
      fetchFollowupLeads,
    ],
  );

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
    <PageContainer>
      <PageHeader
        title="Followup Required"
        description="Leads whose next follow-up date is due today or overdue."
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
        onLeadUpdated={refresh}
        onFieldSaved={drawerState.updateSelectedLead}
      />
    </PageContainer>
  );
};

export default FollowupRequiredPage;
