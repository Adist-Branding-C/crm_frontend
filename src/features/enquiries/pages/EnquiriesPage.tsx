import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Filter, Plus, Flame, Bell, FileText, AlertTriangle, Phone, Calendar } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import PipelineEmptyState from '../../../shared/components/EmptyState';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import LeadDetailDrawer from '../../../shared/components/drawers/LeadDetailDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import AdminConfirmationModal from '../../../shared/components/crud/AdminConfirmationModal';
import Toast from '../../../shared/components/Toast';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useDrafts } from '../../../shared/hooks/useDrafts';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { formatDate } from '../../../shared/utils/dateUtils';
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
import { getLeadIds, mapApiToUI } from '../utils/leadMapper';
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
import DraftsList from '../components/DraftsList';
import ViewToggle from '../../deal-board/components/ViewToggle';
import { useLeadsPipeline } from '../../sales-pipeline/hooks/useLeadsPipeline';
import { usePipelineDragDrop } from '../../sales-pipeline/hooks/usePipelineDragDrop';
import LeadPipelineBoard from '../../sales-pipeline/components/LeadPipelineBoard';
import { leadService } from '../../deal/services/lead.service';
import type { Lead as PipelineLead, PipelineStatusGroup, TaskStatusGroup } from '../../sales-pipeline/types/interface';
import type { Lead } from '../../../features/enquiries/types';
import type { LeadApiItem } from '../types/response';
import type { UpdateLeadPayload } from '../types/request';
import '../../sales-pipeline/pages/SalesPipelinePage.css';
import './EnquiriesPage.css';

type OverlayView = 'spotlight' | 'followups' | 'drafts' | null;
type ListView = 'table' | 'kanban';

const LEAD_LIST_VIEW_STORAGE_KEY = 'adist:lead-board:view';

function readStoredListView(): ListView {
  try {
    return localStorage.getItem(LEAD_LIST_VIEW_STORAGE_KEY) === 'kanban' ? 'kanban' : 'table';
  } catch {
    return 'table';
  }
}

const EnquiriesPage = () => {
  const [overlay, setOverlay] = useState<OverlayView>(null);
  const [listView, setListViewState] = useState<ListView>(readStoredListView);
  const drafts = useDrafts('lead');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (overlay === 'drafts' && drafts.length === 0) {
      setOverlay(null);
    }
  }, [overlay, drafts.length]);
  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );
  const crud = useLeadListData(toast.showToastMessage);

  const pipeline = useLeadsPipeline(reportError);
  const [, setDealGroups] = useState<PipelineStatusGroup[]>([]);
  const [, setTaskGroups] = useState<TaskStatusGroup[]>([]);
  const dragDrop = usePipelineDragDrop(setDealGroups, pipeline.setLeadGroups, setTaskGroups, reportError);
  const [openingLeadId, setOpeningLeadId] = useState<number | null>(null);

  const handleListViewChange = useCallback((next: ListView) => {
    setListViewState(next);
    setOverlay(null);
    try {
      localStorage.setItem(LEAD_LIST_VIEW_STORAGE_KEY, next);
    } catch {
      // Non-fatal - the toggle still works this session.
    }
  }, []);

  useEffect(() => {
    if (listView === 'kanban' && overlay === null) pipeline.fetchLeads({});
  }, [listView, overlay]);

  const refreshKanbanIfActive = useCallback(() => {
    if (listView === 'kanban') pipeline.fetchLeads({});
  }, [listView, pipeline.fetchLeads]);

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

  const deleteLeadEverywhere = useCallback(async (leadId: string) => {
    const ok = await crud.deleteLead(leadId);
    if (ok) refreshKanbanIfActive();
    return ok;
  }, [crud.deleteLead, refreshKanbanIfActive]);

  const deleteConfirm = useLeadDeleteConfirm(deleteLeadEverywhere);
  const rowActions = useLeadRowActions(actionMenu, detailDrawer, deleteConfirm);

  const handleLeadSavedEverywhere = useCallback((action: 'created' | 'updated') => {
    crud.handleLeadSaved(action);
    refreshKanbanIfActive();
  }, [crud.handleLeadSaved, refreshKanbanIfActive]);

  const handleLeadDetailUpdated = useCallback(() => {
    crud.refreshCurrentPage();
    refreshKanbanIfActive();
  }, [crud.refreshCurrentPage, refreshKanbanIfActive]);

  const handleLeadCardClick = useCallback(async (pipelineLead: PipelineLead) => {
    setOpeningLeadId(pipelineLead.id);
    try {
      const res = await leadService.getLeadByPk(pipelineLead.id);
      if (res.status && res.data) {
        detailDrawer.open(mapApiToUI(res.data as LeadApiItem));
      } else {
        toast.showToastMessage(res.message || 'Failed to open lead', 'error');
      }
    } catch {
      toast.showToastMessage('Failed to open lead', 'error');
    } finally {
      setOpeningLeadId(null);
    }
  }, [detailDrawer.open, toast.showToastMessage]);

  const lastSearchParamRef = useRef<string | null>(null);
  useEffect(() => {

    const paramSearch = searchParams.get('search') ?? '';
    if (lastSearchParamRef.current === paramSearch) return;
    lastSearchParamRef.current = paramSearch;
    leadSearch.syncSearchQuery(paramSearch);
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
      toast.showToastMessage('Failed to update lead', 'error');
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
          overlay === 'spotlight' ? 'Spotlight' :
            overlay === 'followups' ? 'Follow Ups' :
              'Leads'
        }
        description={
          overlay === 'spotlight' ? 'High-priority leads that need immediate attention.' :
            overlay === 'followups' ? 'Leads whose next follow-up date is due today or overdue.' :
              'Potential customers showing interest in a product or service.'
        }
        action={
          <>
            <ViewToggle view={listView} onChange={handleListViewChange} />
            {overlay === null && listView === 'kanban' && (
              <button className="btn btn-primary" onClick={() => addDrawer.open()}>
                <Plus size={16} /> Add Lead
              </button>
            )}
            {drafts.length > 0 && (
              <button
                className={`btn btn-secondary ${overlay === 'drafts' ? 'active' : ''}`}
                onClick={() => setOverlay((v) => (v === 'drafts' ? null : 'drafts'))}
              >
                <FileText size={16} /> {overlay === 'drafts' ? 'Back to Leads' : 'Drafts'}
              </button>
            )}
            <button
              className={`btn btn-secondary ${overlay === 'followups' ? 'active' : ''}`}
              onClick={() => setOverlay((v) => (v === 'followups' ? null : 'followups'))}
            >
              <Bell size={16} /> {overlay === 'followups' ? 'Back to Leads' : 'Follow Ups'}
            </button>
            <button
              className={`btn btn-secondary ${overlay === 'spotlight' ? 'active' : ''}`}
              onClick={() => setOverlay((v) => (v === 'spotlight' ? null : 'spotlight'))}
            >
              <Flame size={16} /> {overlay === 'spotlight' ? 'Back to Leads' : 'Spotlight'}
            </button>
          </>
        }
      />

      {overlay === 'spotlight' && <SpotlightPanel />}
      {overlay === 'followups' && <FollowupPanel initialFilters={activeFiltersRef.current} />}
      {overlay === 'drafts' && <DraftsList type="lead" onResumeDraft={(id) => { setOverlay(null); addDrawer.open({ draftId: id } as any); }} />}

      {overlay === null && listView === 'kanban' && (
        <DndContext
          sensors={dragDrop.sensors}
          onDragStart={dragDrop.handleDragStart}
          onDragEnd={dragDrop.handleDragEnd}
          onDragCancel={dragDrop.handleDragCancel}
        >
          {pipeline.isLoading && pipeline.leadGroups.length === 0 ? null : pipeline.error ? (
            <PipelineEmptyState
              message={pipeline.error}
              icon={<AlertTriangle size={48} />}
              action={
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => pipeline.fetchLeads({})}
                >
                  Retry
                </button>
              }
            />
          ) : pipeline.leadGroups.length === 0 ? (
            <PipelineEmptyState message="No lead statuses configured yet - add some in Settings > Lead Statuses" />
          ) : (
            <LeadPipelineBoard
              filteredLeadGroups={pipeline.leadGroups}
              loadingLeadStatusId={pipeline.loadingLeadStatusId}
              loadMoreLeads={pipeline.loadMoreLeads}
              onLeadClick={handleLeadCardClick}
              openingLeadId={openingLeadId}
            />
          )}

          <DragOverlay>
            {dragDrop.activeItem?.type === 'lead' && (
              <div className="deal-card deal-card--overlay">
                <div className="deal-title">{dragDrop.activeItem.lead.name}</div>
                <div className="deal-value">
                  <Phone size={14} />
                  {dragDrop.activeItem.lead.phone}
                </div>
                <div className="deal-due">
                  <Calendar size={12} />
                  <span>Added {formatDate(dragDrop.activeItem.lead.createdAt)}</span>
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}

      {overlay === null && listView === 'table' && (
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
                onApplyFilters={() => {
                  filtersHook.handleApplyFilters();
                  pagination.resetPage();
                }}
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
                {crud.isLoading ? (
                  Array.from({ length: 5 }).map((_, rowIndex) => (
                    <TRow key={rowIndex}>
                      {columns.map(col => (
                        <TCell key={col.key}>
                          <div className="skeleton-box" />
                        </TCell>
                      ))}
                    </TRow>
                  ))
                ) : crud.leads.length === 0 ? (
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

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={crud.totalPages}
              totalItems={pagination.totalItems}
              rowsPerPage={pagination.rowsPerPage}
              onPageChange={pagination.handleSetCurrentPage}
            />
          </div>

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

      <AddLeadDrawer
        isOpen={addDrawer.isOpen}
        onClose={addDrawer.close}
        onSaved={handleLeadSavedEverywhere}
        draftId={(addDrawer.item as { draftId?: string })?.draftId}
      />
      <LeadDetailDrawer lead={detailDrawer.item} isOpen={detailDrawer.isOpen} onClose={detailDrawer.close} onLeadUpdated={handleLeadDetailUpdated} onDeleteLead={rowActions.handleDeleteFromDrawer} />
      <AdminDeleteModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.name} itemType="lead"
        onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
      <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />
    </PageContainer>
  );
};

export default EnquiriesPage;
