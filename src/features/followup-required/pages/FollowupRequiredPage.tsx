import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { useLeadFilterOptions } from '../../enquiries/hooks/useLeadFilterOptions';
import { COLUMNS } from '../constants';
import { useFollowupData } from '../hooks/useFollowupData';
import FollowupToolbar from '../components/FollowupToolbar';
import FollowupFilters from '../components/FollowupFilters';
import FollowupTable from '../components/FollowupTable';
import FollowupPagination from '../components/FollowupPagination';
import './FollowupRequiredPage.css';

const FollowupRequiredPage = () => {
  const {
    searchQuery,
    setSearchQuery,
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
    filters,
    setFilters,
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
    refresh,
  } = useFollowupData();

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

      <FollowupToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        sortConfig={sortConfig}
        onSort={(key) => {
          handleSort(key);
          setShowSortDropdown(false);
        }}
        showSortDropdown={showSortDropdown}
        onToggleSortDropdown={() => setShowSortDropdown(!showSortDropdown)}
      />

      {showFilters && (
        <FollowupFilters
          filters={filters}
          typeOptions={typeOptions}
          statusOptions={statusOptions}
          sourceOptions={sourceOptions}
          staffOptions={staffOptions}
          isLoadingFilterOptions={isLoadingFilterOptions}
          filterOptionsError={filterOptionsError}
          onFilterChange={setFilters}
          onApply={applyFilters}
          onClear={clearFilters}
        />
      )}

      <FollowupTable
        data={data}
        columns={COLUMNS}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={isLoading}
        error={error}
        onRetry={refresh}
        onViewLead={handleViewLead}
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
        lead={selectedLead}
        isOpen={!!selectedLead && isDrawerOpen}
        onClose={handleCloseDrawer}
        onLeadUpdated={refresh}
      />
    </PageContainer>
  );
};

export default FollowupRequiredPage;
