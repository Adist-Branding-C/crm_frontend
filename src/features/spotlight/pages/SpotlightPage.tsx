import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { useSpotlightData } from '../hooks/useSpotlightData';
import { COLUMNS } from '../constants';
import SpotlightToolbar from '../components/SpotlightToolbar';
import SpotlightFilters from '../components/SpotlightFilters';
import SpotlightTable from '../components/SpotlightTable';
import SpotlightPagination from '../components/SpotlightPagination';
import './SpotlightPage.css';

const SpotlightPage = () => {
  const d = useSpotlightData();

  return (
    <PageContainer>
      <PageHeader title="Spotlight" description="High-priority leads that need immediate attention." />

      <SpotlightToolbar
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        showFilters={d.showFilters}
        onToggleFilters={() => d.setShowFilters(!d.showFilters)}
        sortConfig={d.sortConfig}
        onSortDirection={d.handleSortDirection}
        showSortDropdown={d.showSortDropdown}
        onSetShowSortDropdown={d.setShowSortDropdown}
        showActionsDropdown={d.showActionsDropdown}
        onSetShowActionsDropdown={d.setShowActionsDropdown}
        onCloseSortDropdown={() => d.setShowSortDropdown(false)}
        onCloseActionsDropdown={() => d.setShowActionsDropdown(false)}
      />

      {d.showFilters && (
        <SpotlightFilters
          filters={d.filters}
          onFilterChange={d.setFilters}
          onClearFilters={d.clearFilters}
          onClose={() => d.setShowFilters(false)}
        />
      )}

      <SpotlightTable
        data={d.paginatedData}
        columns={COLUMNS}
        sortConfig={d.sortConfig}
        onSort={d.handleSort}
        paginatedIds={d.paginatedIds}
        selectedIds={d.selectedIds}
        onSelectAll={d.handleSelectAll}
        onSelectRow={d.handleSelectRow}
        actionMenuOpen={d.actionMenuOpen}
        onSetActionMenuOpen={d.setActionMenuOpen}
        onViewLead={d.setSelectedLead}
      />

      <SpotlightPagination
        currentPage={d.currentPage}
        totalPages={d.totalPages}
        startIndex={d.startIndex}
        rowsPerPage={d.rowsPerPage}
        totalItems={d.filteredData.length}
        onPageChange={d.setCurrentPage}
        onRowsPerPageChange={d.handleRowsPerPageChange}
      />

      <LeadDetailDrawer lead={d.selectedLead} isOpen={!!d.selectedLead} onClose={() => d.setSelectedLead(null)} />
    </PageContainer>
  );
};

export default SpotlightPage;
