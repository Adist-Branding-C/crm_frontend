import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { useDealsData } from '../hooks/useDealsData';
import { dealColumns } from '../constants';
import DealsStatsBar from '../components/DealsStatsBar';
import DealsToolbar from '../components/DealsToolbar';
import DealsFilters from '../components/DealsFilters';
import DealsTable from '../components/DealsTable';
import DealsPagination from '../components/DealsPagination';
import './EnquiriesPage.css';
import './DealsPage.css';
import './DealTasksPage.css';

const DealsPage = () => {
  const d = useDealsData();

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track sales opportunities, aiding management and conversion of potential customers."
      />

      <DealsStatsBar totalAmount={d.totalDealAmount} totalCount={d.totalDealsCount} />

      <DealsToolbar
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        showFilters={d.showFilters}
        onToggleFilters={() => d.setShowFilters(!d.showFilters)}
        sortConfig={d.sortConfig}
        onSort={d.handleSort}
        onSortDirection={d.handleSortDirection}
        showSortDropdown={d.showSortDropdown}
        onSetShowSortDropdown={d.setShowSortDropdown}
        onExport={d.handleExportCSV}
        onAddDeal={d.handleAddDeal}
      />

      {d.showFilters && (
        <DealsFilters
          filters={d.filters}
          onFilterChange={d.setFilters}
          onClearFilters={d.clearFilters}
          onClose={() => d.setShowFilters(false)}
        />
      )}

      <DealsTable
        data={d.paginatedData}
        columns={dealColumns}
        sortConfig={d.sortConfig}
        onSort={d.handleSort}
        paginatedIds={d.paginatedIds}
        selectedIds={d.selectedIds}
        onSelectAll={d.handleSelectAll}
        onSelectRow={d.handleSelectRow}
        actionMenuOpen={d.actionMenuOpen}
        onSetActionMenuOpen={d.setActionMenuOpen}
        onEdit={d.handleEditDeal}
        onDelete={d.handleDeleteDeal}
      />

      <DealsPagination
        currentPage={d.currentPage}
        totalPages={d.totalPages}
        startIndex={d.startIndex}
        rowsPerPage={d.rowsPerPage}
        totalItems={d.filteredData.length}
        onPageChange={d.setCurrentPage}
        onRowsPerPageChange={d.handleRowsPerPageChange}
      />

      <AddDealDrawer
        isOpen={d.isDrawerOpen}
        onClose={() => { d.setIsDrawerOpen(false); d.setEditingDeal(null); }}
        deal={d.editingDeal ? {
          dealName: d.editingDeal.dealName,
          lead: d.editingDeal.lead,
          mobile: d.editingDeal.mobile,
          amount: String(d.editingDeal.amount),
          status: d.editingDeal.status,
          type: d.editingDeal.type,
          startDate: d.editingDeal.startDate,
          endDate: d.editingDeal.endDate,
          assignAgent: d.editingDeal.agent,
        } : null}
        onSave={d.handleSaveDeal}
      />
    </PageContainer>
  );
};

export default DealsPage;
