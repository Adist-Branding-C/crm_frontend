import React, { useMemo } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import LeadDetailDrawer from '../../../shared/components/drawers/LeadDetailDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import Toast from '../../../shared/components/Toast';
import { useEnquiriesData } from '../hooks/useEnquiriesData';
import { COLUMNS } from '../constants';
import EnquiriesToolbar from '../components/EnquiriesToolbar';
import EnquiriesFilters from '../components/EnquiriesFilters';
import EnquiriesTable from '../components/EnquiriesTable';
import EnquiriesPagination from '../components/EnquiriesPagination';
import ChangeStatusModal from '../components/ChangeStatusModal';
import AssignStaffModal from '../components/AssignStaffModal';
import DeleteSelectedModal from '../components/DeleteSelectedModal';
import type { Column } from '../../../shared/types/table';
import type { Lead } from '../../../features/enquiries/types';
import './EnquiriesPage.css';

const EnquiriesPage = () => {
  const d = useEnquiriesData();

  const dynamicColumns: Column[] = useMemo(() => {
    const fieldNames = new Set<string>();
    for (const lead of d.paginatedData) {
      for (const field of lead.additionalFields) {
        fieldNames.add(field.name);
      }
    }
    return Array.from(fieldNames).map(name => ({ key: name, label: name }));
  }, [d.paginatedData]);

  const columns = useMemo(() => [...COLUMNS, ...dynamicColumns], [dynamicColumns]);

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
        selectedCount={d.selectedIds.length}
        onExportSelected={d.handleExportSelected}
        onChangeStatus={d.handleChangeStatusClick}
        onAssignStaff={d.handleAssignStaffClick}
        onSendFollowUp={d.handleSendFollowUp}
        onDuplicateLead={d.handleDuplicateLeadAction}
        onDeleteSelected={d.handleDeleteSelectedClick}
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
        columns={columns}
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

      <AddLeadDrawer isOpen={d.isDrawerOpen} onClose={() => d.setIsDrawerOpen(false)} onSaved={(action) => { d.refreshCurrentPage(); d.showToastMessage(action === 'created' ? 'Lead created successfully' : 'Lead updated successfully', 'success'); }} />
      <LeadDetailDrawer lead={d.selectedLead} isOpen={!!d.selectedLead} onClose={() => d.setSelectedLead(null)} onLeadUpdated={() => d.refreshCurrentPage()} onDeleteLead={(lead: Lead) => { d.setSelectedLead(null); d.handleDeleteClick(lead); }} />
      <AdminDeleteModal isOpen={!!d.deleteTargetLead} itemName={d.deleteTargetLead?.name} itemType="lead"
        onConfirm={d.handleConfirmDelete} onClose={d.handleCloseDelete} />
      <Toast message={d.toastMessage} type={d.toastType} isVisible={d.showToast} onClose={() => d.setShowToast(false)} />

      <ChangeStatusModal
        isOpen={d.showChangeStatusModal}
        selectedCount={d.selectedIds.length}
        isProcessing={d.isProcessingSelected}
        onConfirm={d.handleConfirmChangeStatus}
        onClose={() => d.setShowChangeStatusModal(false)}
      />
      <AssignStaffModal
        isOpen={d.showAssignStaffModal}
        selectedCount={d.selectedIds.length}
        isProcessing={d.isProcessingSelected}
        onConfirm={d.handleConfirmAssignStaff}
        onClose={() => d.setShowAssignStaffModal(false)}
      />
      <DeleteSelectedModal
        isOpen={d.showDeleteSelectedModal}
        selectedCount={d.selectedIds.length}
        isProcessing={d.isProcessingSelected}
        onConfirm={d.handleConfirmDeleteSelected}
        onClose={() => d.setShowDeleteSelectedModal(false)}
      />
    </PageContainer>
  );
};

export default EnquiriesPage;
