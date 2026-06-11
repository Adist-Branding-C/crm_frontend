import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../shared/components/drawers/LeadDetailDrawer';
import { useSpotlightData } from '../hooks/useSpotlightData';
import { COLUMNS } from '../constants';
import SpotlightToolbar from '../components/SpotlightToolbar';
import SpotlightFilters from '../components/SpotlightFilters';
import SpotlightTable from '../components/SpotlightTable';
import SpotlightPagination from '../components/SpotlightPagination';
import './SpotlightPage.css';

const SpotlightPage = () => {
  const spotlightData = useSpotlightData();

  return (
    <PageContainer>
      <PageHeader title="Spotlight" description="High-priority leads that need immediate attention." />

      <SpotlightToolbar
        searchQuery={spotlightData.searchQuery}
        onSearchChange={spotlightData.setSearchQuery}
        showFilters={spotlightData.showFilters}
        onToggleFilters={() => spotlightData.setShowFilters(!spotlightData.showFilters)}
        sortConfig={spotlightData.sortConfig}
        onSortDirection={spotlightData.handleSortDirection}
        showSortDropdown={spotlightData.showSortDropdown}
        onSetShowSortDropdown={spotlightData.setShowSortDropdown}
        showActionsDropdown={spotlightData.showActionsDropdown}
        onSetShowActionsDropdown={spotlightData.setShowActionsDropdown}
        onCloseSortDropdown={() => spotlightData.setShowSortDropdown(false)}
        onCloseActionsDropdown={() => spotlightData.setShowActionsDropdown(false)}
      />

      {spotlightData.showFilters && (
        <SpotlightFilters
          filters={spotlightData.filters}
          filterOptions={spotlightData.filterOptions}
          onFilterChange={spotlightData.setFilters}
          onClearFilters={spotlightData.clearFilters}
          onClose={() => spotlightData.setShowFilters(false)}
        />
      )}

      <div style={{ position: 'relative' }}>
        <SpotlightTable
          data={spotlightData.paginatedData}
          columns={COLUMNS}
          sortConfig={spotlightData.sortConfig}
          onSort={spotlightData.handleSort}
          paginatedIds={spotlightData.paginatedIds}
          selectedIds={spotlightData.selectedIds}
          onSelectAll={spotlightData.handleSelectAll}
          onSelectRow={spotlightData.handleSelectRow}
          actionMenuOpen={spotlightData.actionMenuOpen}
          onSetActionMenuOpen={spotlightData.setActionMenuOpen}
          onViewLead={spotlightData.setSelectedLead}
        />
        {spotlightData.loading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, fontSize: '0.875rem', color: '#6b7280' }}>
            Loading...
          </div>
        )}
      </div>

      {spotlightData.error && <div style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', background: '#fef2f2', color: '#dc2626', borderRadius: '6px', fontSize: '0.875rem' }}>{spotlightData.error}</div>}

      <SpotlightPagination
        currentPage={spotlightData.currentPage}
        totalPages={spotlightData.totalPages}
        startIndex={spotlightData.startIndex}
        rowsPerPage={spotlightData.rowsPerPage}
        totalItems={spotlightData.totalRecords}
        onPageChange={spotlightData.setCurrentPage}
        onRowsPerPageChange={spotlightData.handleRowsPerPageChange}
      />

      <LeadDetailDrawer lead={spotlightData.selectedLead} isOpen={!!spotlightData.selectedLead} onClose={() => spotlightData.setSelectedLead(null)} />
    </PageContainer>
  );
};

export default SpotlightPage;
