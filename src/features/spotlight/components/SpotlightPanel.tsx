import React from 'react';
import LeadDetailDrawer from '../../../shared/components/drawers/LeadDetailDrawer';
import { useSpotlightData } from '../hooks/useSpotlightData';
import { COLUMNS } from '../constants';
import SpotlightToolbar from './SpotlightToolbar';
import SpotlightFilters from './SpotlightFilters';
import SpotlightTable from './SpotlightTable';
import SpotlightPagination from './SpotlightPagination';
import './SpotlightPanel.css';


const SpotlightPanel = () => {
  const spotlightData = useSpotlightData();

  return (
    <>
      <SpotlightToolbar
        searchQuery={spotlightData.searchQuery}
        onSearchChange={spotlightData.setSearchQuery}
        showFilters={spotlightData.showFilters}
        onToggleFilters={spotlightData.toggleFilters}
        sortConfig={spotlightData.sortConfig}
        onSelectSort={spotlightData.selectSort}
        showSortDropdown={spotlightData.showSortDropdown}
        onToggleSortDropdown={spotlightData.toggleSortDropdown}
        onExport={spotlightData.handleExport}
        isExporting={spotlightData.isExporting}
      />

      {spotlightData.showFilters && (
        <SpotlightFilters
          filters={spotlightData.filters}
          filterOptions={spotlightData.filterOptions}
          isLoading={spotlightData.filterOptionsLoading}
          onFilterChange={spotlightData.setFilters}
          onClearFilters={spotlightData.clearFilters}
          onClose={spotlightData.closeFilters}
        />
      )}

      {spotlightData.loading && (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="loading-spinner" />
          <span>Loading spotlight leads...</span>
        </div>
      )}

      {spotlightData.error && (
        <div className="error-banner" role="alert" aria-live="assertive">
          <span>{spotlightData.error}</span>
          <button
            className="btn btn-sm btn-secondary"
            onClick={spotlightData.refetch}
          >
            Retry
          </button>
        </div>
      )}

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
        onToggleMenu={spotlightData.onToggleMenu}
        onViewLead={spotlightData.handleViewLead}
        loading={spotlightData.loading}
      />

      <SpotlightPagination
        currentPage={spotlightData.currentPage}
        totalPages={spotlightData.totalPages}
        startIndex={spotlightData.startIndex}
        rowsPerPage={spotlightData.rowsPerPage}
        totalItems={spotlightData.totalRecords}
        onPageChange={spotlightData.setCurrentPage}
        onRowsPerPageChange={spotlightData.handleRowsPerPageChange}
      />

      <LeadDetailDrawer
        lead={spotlightData.selectedLead}
        isOpen={!!spotlightData.selectedLead}
        onClose={spotlightData.closeLeadDetail}
        onLeadUpdated={spotlightData.refetch}
      />
    </>
  );
};

export default SpotlightPanel;
