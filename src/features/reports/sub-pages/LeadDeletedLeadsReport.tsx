import React, { useRef, useEffect, useMemo } from 'react';
import { ChevronUp, ChevronDown, Filter, RotateCcw } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import AdminConfirmationModal from '../../../shared/components/crud/AdminConfirmationModal';
import Toast from '../../../shared/components/Toast';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useToast } from '../../../shared/hooks/useToast';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useLeadPagination } from '../../enquiries/hooks/useLeadPagination';
import { useLeadSearch } from '../../enquiries/hooks/useLeadSearch';
import { useLeadSort } from '../../enquiries/hooks/useLeadSort';
import { useLeadFilters } from '../../enquiries/hooks/useLeadFilters';
import { useLeadActionMenu } from '../../enquiries/hooks/useLeadActionMenu';
import { useLeadClearFilters } from '../../enquiries/hooks/useLeadClearFilters';
import { useDeletedLeadListData } from '../hooks/useDeletedLeadListData';
import { useLeadRestoreConfirm } from '../hooks/useLeadRestoreConfirm';
import { useLeadRestoreRowAction } from '../hooks/useLeadRestoreRowAction';
import { useLeadBulkRestore } from '../hooks/useLeadBulkRestore';
import { getLeadIds } from '../../enquiries/utils/leadMapper';
import { DELETED_LEAD_COLUMNS } from '../constants';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import EnquiriesFilters from '../../enquiries/components/EnquiriesFilters';
import LeadSortDropdown from '../../enquiries/components/LeadSortDropdown';
import DeletedLeadRow from '../components/DeletedLeadRow';
import '../../enquiries/pages/EnquiriesPage.css';
import './ReportsSubPages.css';

const LeadDeletedLeadsReport = () => {
  const toast = useToast();
  const crud = useDeletedLeadListData(toast.showToastMessage);

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');

  const filtersHook = useLeadFilters(crud.fetchLeads, searchQueryRef, rowsPerPageRef);
  const { activeFiltersRef } = filtersHook;

  const sortHook = useLeadSort(crud.fetchLeads, activeFiltersRef, searchQueryRef, rowsPerPageRef);

  const pagination = useLeadPagination(crud.fetchLeads, activeFiltersRef, searchQueryRef, crud.total);

  const leadSearch = useLeadSearch(crud.fetchLeads, activeFiltersRef, rowsPerPageRef, pagination.resetPage);

  useEffect(() => {
    rowsPerPageRef.current = pagination.rowsPerPage;
    searchQueryRef.current = leadSearch.searchQuery;
  });

  const selection = useTableSelection<string>();

  const actionMenu = useLeadActionMenu();

  const restoreConfirm = useLeadRestoreConfirm(crud.restoreLead);
  const rowActions = useLeadRestoreRowAction(actionMenu, restoreConfirm);

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    crud.fetchLeads(1, 10, '', {});
  }, []);

  const paginatedIds = useMemo(() => getLeadIds(crud.leads), [crud.leads]);

  const clearFilters = useLeadClearFilters(filtersHook, leadSearch, pagination, sortHook, crud.fetchLeads, rowsPerPageRef);

  const bulkRestore = useLeadBulkRestore({
    selectedIds: selection.selectedIds,
    onRefresh: crud.refreshCurrentPage,
    onShowToast: toast.showToastMessage,
    onClearSelection: selection.setSelectedIds,
  });

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Leads" description="View and restore previously deleted leads" breadcrumb={false} />

      <div className="table-container">
        <TableNav
          searchQuery={leadSearch.searchQuery}
          onSearchChange={leadSearch.setSearchQuery}
          searchPlaceholder="Search deleted leads..."
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={() => filtersHook.setShowFilters(!filtersHook.showFilters)}>
            <Filter size={16} /> Filter <ChevronDown size={14} className={filtersHook.showFilters ? 'rotate' : ''} />
          </button>

          <LeadSortDropdown
            sortConfig={sortHook.sortConfig}
            onSortDesc={sortHook.handleSortDesc}
            onSortAsc={sortHook.handleSortAsc}
          />

          <button className="btn btn-primary" onClick={bulkRestore.handleRestoreSelectedClick}>
            <RotateCcw size={16} /> Recover Selected{selection.selectedIds.length > 0 ? ` (${selection.selectedIds.length})` : ''}
          </button>
        </TableNav>

        {filtersHook.showFilters && (
          <EnquiriesFilters
            filters={filtersHook.filters}
            onFilterChange={filtersHook.setFilters}
            onApplyFilters={filtersHook.handleApplyFilters}
            onClearFilters={clearFilters}
          />
        )}

        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {DELETED_LEAD_COLUMNS.map(col => (
                <TCell
                  key={col.key}
                  variant="th"
                  className={col.sortable ? 'sortable' : ''}
                  onClick={col.sortable ? () => sortHook.handleSort(col.key) : undefined}
                >
                  {col.key === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={crud.leads.length > 0 && crud.leads.every(row => selection.selectedIds.includes(row.leadId))}
                      onChange={(e) => selection.handleSelectAll(paginatedIds, e.target.checked)}
                    />
                  ) : (
                    <>
                      {col.label}
                      {col.sortable && sortHook.sortConfig.key === col.key && (
                        sortHook.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </>
                  )}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {crud.leads.length === 0 ? (
              <EmptyState colSpan={DELETED_LEAD_COLUMNS.length} message={LABEL_NO_DATA} />
            ) : (
              crud.leads.map(lead => (
                <DeletedLeadRow
                  key={lead.leadId}
                  lead={lead}
                  columns={DELETED_LEAD_COLUMNS}
                  isSelected={selection.selectedIds.includes(lead.leadId)}
                  onSelectRow={selection.handleSelectRow}
                  actionMenu={{
                    isOpen: actionMenu.openId === lead.leadId,
                    buttonRect: actionMenu.openId === lead.leadId ? actionMenu.buttonRect : null,
                    onOpen: actionMenu.open,
                    onClose: actionMenu.close,
                  }}
                  onRecoverLead={rowActions.handleRestoreFromRow}
                />
              ))
            )}
          </TBody>
        </Table>

        {crud.isLoading && <div className="table-loading">Loading...</div>}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={crud.totalPages}
          totalItems={pagination.totalItems}
          rowsPerPage={pagination.rowsPerPage}
          onPageChange={pagination.handleSetCurrentPage}
        />
      </div>

      <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />

      <AdminConfirmationModal
        isOpen={!!restoreConfirm.deletingItem}
        title="Recover Lead"
        message={`Are you sure you want to recover ${restoreConfirm.deletingItem?.name ?? 'this lead'}?`}
        confirmText="Recover"
        confirmButtonVariant="primary"
        onConfirm={restoreConfirm.handleConfirmDelete}
        onCancel={restoreConfirm.closeDeleteModal}
      />

      <AdminConfirmationModal
        isOpen={bulkRestore.showRestoreSelectedModal}
        title="Recover Selected Leads"
        message={`Are you sure you want to recover ${selection.selectedIds.length} selected lead(s)?`}
        confirmText="Recover Selected"
        confirmButtonVariant="primary"
        isLoading={bulkRestore.isProcessingSelected}
        onConfirm={bulkRestore.handleConfirmRestoreSelected}
        onCancel={() => bulkRestore.setShowRestoreSelectedModal(false)}
      />
    </div>
  );
};

export default LeadDeletedLeadsReport;
