
import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import Toast from '../../../shared/components/Toast';
import { useEnquiriesData } from '../hooks/useEnquiriesData';
import { COLUMNS } from '../constants';
import EnquiriesToolbar from '../components/EnquiriesToolbar';
import EnquiriesFilters from '../components/EnquiriesFilters';
import EnquiriesTable from '../components/EnquiriesTable';
import EnquiriesPagination from '../components/EnquiriesPagination';
import './EnquiriesPage.css';

const EnquiriesPage = () => {
  const d = useEnquiriesData();

  return (
    <PageContainer>
      <PageHeader title="Leads" description="Potential customers showing interest in a product or service." />

      <EnquiriesToolbar
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        showFilters={d.showFilters}
        onToggleFilters={() => d.setShowFilters(!d.showFilters)}
        sortConfig={d.sortConfig}
        onSortDesc={d.handleSortDesc}
        onSortAsc={d.handleSortAsc}
        showSortDropdown={d.showSortDropdown}
        sortDropdownClosing={d.sortDropdownClosing}
        sortDropdownRef={d.sortDropdownRef}
        onSetShowSortDropdown={d.setShowSortDropdown}
        onCloseSortDropdown={d.closeSortDropdown}
        showActionsDropdown={d.showActionsDropdown}
        actionsDropdownClosing={d.actionsDropdownClosing}
        actionsDropdownRef={d.actionsDropdownRef}
        onSetShowActionsDropdown={d.setShowActionsDropdown}
        onCloseActionsDropdown={d.closeActionsDropdown}
        onAddLead={() => d.setIsDrawerOpen(true)}
      />

      {d.showFilters && (
        <EnquiriesFilters
          filters={d.filters}
          onFilterChange={d.setFilters}
          onApplyFilters={d.handleApplyFilters}
          onClearFilters={d.clearFilters}
          onClose={() => d.setShowFilters(false)}
        />
      )}

      <EnquiriesTable
        data={d.paginatedData}
        columns={COLUMNS}
        sortConfig={d.sortConfig}
        onSort={d.handleSort}
        paginatedIds={d.paginatedIds}
        selectedIds={d.selectedIds}
        onSelectAll={d.handleSelectAll}
        onSelectRow={d.handleSelectRow}
        actionMenuOpen={d.actionMenuOpen}
        actionMenuButtonRect={d.actionMenuButtonRect}
        onSetActionMenuOpen={d.setActionMenuOpen}
        onSetActionMenuButtonRect={d.setActionMenuButtonRect}
        onViewLead={d.setSelectedLead}
        onEditLead={d.setSelectedLead}
        onDeleteLead={d.handleDeleteClick}
      />

      {d.isLoading && <div className="table-loading">Loading...</div>}
      <EnquiriesPagination
        currentPage={d.currentPage}
        totalPages={d.totalPages}
        startIndex={d.startIndex}
        rowsPerPage={d.rowsPerPage}
        totalItems={d.totalItems}
        onPageChange={d.setCurrentPage}
        onRowsPerPageChange={d.handleRowsPerPageChange}
      />

      <AddLeadDrawer isOpen={d.isDrawerOpen} onClose={() => d.setIsDrawerOpen(false)} onSaved={() => { d.setRefreshKey(k => k + 1); d.showToastMessage('Lead created successfully', 'success'); }} />
      <LeadDetailDrawer lead={d.selectedLead} isOpen={!!d.selectedLead} onClose={() => d.setSelectedLead(null)} />
      <AdminDeleteModal isOpen={!!d.deleteTargetLead} itemName={d.deleteTargetLead?.name} itemType="lead"
        onConfirm={d.handleConfirmDelete} onClose={d.handleCloseDelete} />
      <Toast message={d.toastMessage} type={d.toastType} isVisible={d.showToast} onClose={() => d.setShowToast(false)} />
    </PageContainer>
  );
};

export default EnquiriesPage;
