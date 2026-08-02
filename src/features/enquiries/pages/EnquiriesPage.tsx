import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Filter, Plus, Flame, Bell } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import LeadDetailDrawer from '../../../shared/components/drawers/LeadDetailDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import AdminConfirmationModal from '../../../shared/components/crud/AdminConfirmationModal';
import Toast from '../../../shared/components/Toast';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useLeadListData } from '../hooks/useLeadListData';
import { useLeadPagination } from '../hooks/useLeadPagination';
import { useLeadSearch } from '../hooks/useLeadSearch';
import { useLeadSort } from '../hooks/useLeadSort';
import { useLeadFilters } from '../hooks/useLeadFilters';
import { useLeadFilterOptions } from '../hooks/useLeadFilterOptions';
import { leadDataService } from '../services/leadDataService';
import { useLeadBulkActions } from '../hooks/useLeadBulkActions';
import { useLeadDeleteConfirm } from '../hooks/useLeadDeleteConfirm';
import { useLeadActionMenu } from '../hooks/useLeadActionMenu';
import { useLeadRowActions } from '../hooks/useLeadRowActions';
import { useLeadClearFilters } from '../hooks/useLeadClearFilters';
import { getLeadColumns } from '../utils/leadColumns';
import { getLeadIds } from '../utils/leadMapper';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import EnquiriesFilters from '../components/EnquiriesFilters';
import EnquiriesRow from '../components/EnquiriesRow';
import LeadSortDropdown from '../components/LeadSortDropdown';
import LeadActionsDropdown from '../components/LeadActionsDropdown';
import ChangeStatusModal from '../components/ChangeStatusModal';
import AssignStaffModal from '../components/AssignStaffModal';
import AssignCampaignModal from '../components/AssignCampaignModal';
import SpotlightPanel from '../../spotlight/components/SpotlightPanel';
import FollowupPanel from '../../followup-required/components/FollowupPanel';
import type { Lead } from '../../../features/enquiries/types';
import type { UpdateLeadPayload } from '../types/request';
import './EnquiriesPage.css';

type EnquiriesView = 'leads' | 'spotlight' | 'followups';

const EnquiriesPage = () => {
  const [activeView, setActiveView] = useState<EnquiriesView>('leads');
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const crud = useLeadListData(toast.showToastMessage);

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

  const addDrawer = useDrawer();
  const detailDrawer = useDrawer<Lead>();

  const actionMenu = useLeadActionMenu();

  const deleteConfirm = useLeadDeleteConfirm(crud.deleteLead);
  const rowActions = useLeadRowActions(actionMenu, detailDrawer, deleteConfirm);

  const lastSearchParamRef = useRef<string | null>(null);
  useEffect(() => {

    const paramSearch = searchParams.get('search') ?? '';
    if (lastSearchParamRef.current === paramSearch) return;
    lastSearchParamRef.current = paramSearch;
    leadSearch.setSearchQuery(paramSearch);
    pagination.resetPage();
    crud.fetchLeads(1, rowsPerPageRef.current, paramSearch, activeFiltersRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!detailDrawer.item) return;
    const updated = crud.leads.find(l => l.id === detailDrawer.item!.id);
    if (updated && updated.updatedAt !== detailDrawer.item!.updatedAt) {
      detailDrawer.open(updated);
    }
  }, [crud.leads, detailDrawer.item, detailDrawer.open]);

  const paginatedIds = useMemo(() => getLeadIds(crud.leads), [crud.leads]);

  const clearFilters = useLeadClearFilters(filtersHook, leadSearch, pagination, sortHook, crud.fetchLeads, rowsPerPageRef);

  const bulkActions = useLeadBulkActions({
    selectedIds: selection.selectedIds,
    onRefresh: crud.refreshCurrentPage,
    onShowToast: toast.showToastMessage,
    onClearSelection: selection.setSelectedIds,
  });

  const columns = useMemo(() => getLeadColumns(crud.leads), [crud.leads]);

  const fieldOptions = useLeadFilterOptions();

  const handleFieldSave = async (leadId: string, payload: UpdateLeadPayload) => {
    try {
      const res = await leadDataService.updateLead(leadId, payload);
      if (res.status) {
        crud.refreshCurrentPage();
        return true;
      }
      toast.showToastMessage(res.message || 'Failed to update lead', 'error');
      return false;
    } catch {
      toast.showToastMessage('Failed to update lead', 'error');
      return false;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={
          activeView === 'spotlight' ? 'Spotlight' :
            activeView === 'followups' ? 'Follow Ups' :
              'Leads'
        }
        description={
          activeView === 'spotlight' ? 'High-priority leads that need immediate attention.' :
            activeView === 'followups' ? 'Leads whose next follow-up date is due today or overdue.' :
              'Potential customers showing interest in a product or service.'
        }
        action={
          <>
            <button
              className={`btn btn-secondary ${activeView === 'followups' ? 'active' : ''}`}
              onClick={() => setActiveView((v) => (v === 'followups' ? 'leads' : 'followups'))}
            >
              <Bell size={16} /> {activeView === 'followups' ? 'Back to Leads' : 'Follow Ups'}
            </button>
            <button
              className={`btn btn-secondary ${activeView === 'spotlight' ? 'active' : ''}`}
              onClick={() => setActiveView((v) => (v === 'spotlight' ? 'leads' : 'spotlight'))}
            >
              <Flame size={16} /> {activeView === 'spotlight' ? 'Back to Leads' : 'Spotlight'}
            </button>
          </>
        }
      />

      {activeView === 'spotlight' && <SpotlightPanel />}
      {activeView === 'followups' && <FollowupPanel />}

      {activeView === 'leads' && (
        <>
          <div className="table-container">
            <TableNav
              searchQuery={leadSearch.searchQuery}
              onSearchChange={leadSearch.setSearchQuery}
              searchPlaceholder="Search enquiries..."
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

              <LeadActionsDropdown
                selectedCount={selection.selectedIds.length}
                bulkActions={{
                  onExportSelected: bulkActions.handleExportSelected,
                  onChangeStatus: bulkActions.handleChangeStatusClick,
                  onAssignStaff: bulkActions.handleAssignStaffClick,
                  onAssignCampaign: bulkActions.handleAssignCampaignClick,
                  onDuplicateLead: bulkActions.handleDuplicateLeadAction,
                  onDeleteSelected: bulkActions.handleDeleteSelectedClick,
                }}
              />

              <button className="btn btn-primary" onClick={() => addDrawer.open()}>
                <Plus size={16} /> Add Lead
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
                  {columns.map(col => (
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
                  <EmptyState colSpan={columns.length} message={LABEL_NO_DATA} />
                ) : (
                  crud.leads.map(lead => (
                    <EnquiriesRow
                      key={lead.leadId}
                      lead={lead}
                      columns={columns}
                      isSelected={selection.selectedIds.includes(lead.leadId)}
                      onSelectRow={selection.handleSelectRow}
                      actionMenu={{
                        isOpen: actionMenu.openId === lead.leadId,
                        buttonRect: actionMenu.openId === lead.leadId ? actionMenu.buttonRect : null,
                        onOpen: actionMenu.open,
                        onClose: actionMenu.close,
                      }}
                      onViewLead={detailDrawer.open}
                      onDeleteLead={rowActions.handleDeleteFromRow}
                      fieldOptions={fieldOptions}
                      onFieldSave={handleFieldSave}
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

          <AddLeadDrawer isOpen={addDrawer.isOpen} onClose={addDrawer.close} onSaved={crud.handleLeadSaved} />
          <LeadDetailDrawer lead={detailDrawer.item} isOpen={detailDrawer.isOpen} onClose={detailDrawer.close} onLeadUpdated={crud.refreshCurrentPage} onDeleteLead={rowActions.handleDeleteFromDrawer} />
          <AdminDeleteModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.name} itemType="lead"
            onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
          <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />

          <ChangeStatusModal
            isOpen={bulkActions.showChangeStatusModal}
            selectedCount={selection.selectedIds.length}
            isProcessing={bulkActions.isProcessingSelected}
            onConfirm={bulkActions.handleConfirmChangeStatus}
            onClose={() => bulkActions.setShowChangeStatusModal(false)}
          />
          <AssignStaffModal
            isOpen={bulkActions.showAssignStaffModal}
            selectedCount={selection.selectedIds.length}
            isProcessing={bulkActions.isProcessingSelected}
            onConfirm={bulkActions.handleConfirmAssignStaff}
            onClose={() => bulkActions.setShowAssignStaffModal(false)}
          />
          <AssignCampaignModal
            isOpen={bulkActions.showAssignCampaignModal}
            selectedCount={selection.selectedIds.length}
            isProcessing={bulkActions.isProcessingSelected}
            onConfirm={bulkActions.handleConfirmAssignCampaign}
            onClose={() => bulkActions.setShowAssignCampaignModal(false)}
          />
          <AdminConfirmationModal
            isOpen={bulkActions.showDeleteSelectedModal}
            title="Delete Selected Leads"
            message={`Are you sure you want to delete ${selection.selectedIds.length} selected lead(s)? This action cannot be undone.`}
            confirmText="Delete Selected"
            confirmButtonVariant="danger"
            isLoading={bulkActions.isProcessingSelected}
            onConfirm={bulkActions.handleConfirmDeleteSelected}
            onCancel={() => bulkActions.setShowDeleteSelectedModal(false)}
          />
        </>
      )}
    </PageContainer>
  );
};

export default EnquiriesPage;
