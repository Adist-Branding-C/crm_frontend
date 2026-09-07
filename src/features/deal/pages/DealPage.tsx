import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { ChevronUp, ChevronDown, Filter, Plus, Briefcase, FileText } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import DraftsList from '../../enquiries/components/DraftsList';
import PreviewCanvas, { PreviewSection } from '../../../shared/components/preview/PreviewCanvas';
import { draftService } from '../../../shared/services/draftService';
import { useToast } from '../../../shared/hooks/useToast';
import { useDealList } from '../hooks/useDealList';
import { useDealPagination } from '../hooks/useDealPagination';
import { useDealSearch } from '../hooks/useDealSearch';
import { useDealSort } from '../hooks/useDealSort';
import { useDealFilters } from '../hooks/useDealFilters';
import { useDealDeleteConfirm } from '../hooks/useDealDeleteConfirm';
import { useDealActionMenu } from '../hooks/useDealActionMenu';
import { useDealRowActions } from '../hooks/useDealRowActions';
import { useDrafts } from '../../../shared/hooks/useDrafts';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import DealDetailDrawer from '../../../shared/components/drawers/DealDetailDrawer';
import DealBulkActionsDropdown from '../components/DealBulkActionsDropdown';
import BulkChangeStageModal from '../components/BulkChangeStageModal';
import BulkReassignOwnerModal from '../components/BulkReassignOwnerModal';
import { useDealBulkActions } from '../hooks/useDealBulkActions';
import { useDealClearFilters } from '../hooks/useDealClearFilters';
import { useDealCrud } from '../hooks/useDealCrud';
import { useDealDrawer } from '../hooks/useDealDrawer';
import { useDealFormSubmit } from '../hooks/useDealFormSubmit';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { useStaffList } from '../hooks/useStaffList';
import { dealService } from '../services/deal.service';
import { useActiveWhatsappTemplates } from '../../../shared/hooks/useActiveWhatsappTemplates';
import { buildWhatsappUrl } from '../../../shared/utils/whatsappMessage.util';
import { getDealColumns } from '../utils/dealColumns';
import { getDealIds } from '../utils/dealMapper';
import { getFieldKey, getInitialValues } from '../utils/additionalFields';
import { splitMobileValue } from '../utils/mobileFormat';
import { getDealValidationSchema } from '../validations';
import DealRow from '../components/DealRow';
import DealFilters from '../components/DealFilters';
import DealSortDropdown from '../components/DealSortDropdown';
import DealForm from '../components/DealForm';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import { DEAL_FORM_DEFAULT_VALUES } from '../constants/dealFormDefaults';
import { DEFAULT_CURRENCY } from '../../../shared/constants/currencies';
import type { DealFormData } from '../../../shared/types/drawers';
import type { DealItem } from '../types/interface';
import './DealPage.css';

export interface DealPageProps {
  headerExtra?: React.ReactNode;
  /**
   * Rendered directly under the "Deals" page header (e.g. the unified
   * board's summary/currency bar) - a separate slot from `headerExtra`
   * (which sits inline in the header itself) so callers can't accidentally
   * render content above the header.
   */
  belowHeader?: React.ReactNode;
  /**
   * When set, "Actions → Change Stage" only offers this pipeline's stages
   * (the unified board passes its currently-selected pipeline). Left unset
   * for standalone use, where a selection can span pipelines.
   */
  pipelineId?: string | number | undefined;
  /**
   * One-shot instruction from the Kanban board to open a deal for editing or
   * deletion right after the view flips to the table (the Kanban detail
   * drawer has no edit form of its own).
   */
  initialAction?: { deal: DealItem; type: 'edit' | 'delete' } | null | undefined;
  /** Called once `initialAction` has been consumed. */
  onInitialActionHandled?: (() => void) | undefined;
}

const DealPage = ({ headerExtra, belowHeader, pipelineId, initialAction, onInitialActionHandled }: DealPageProps) => {
  const toast = useToast();
  const list = useDealList(toast.showToastMessage);
  const { staff: formStaff } = useDealFormOptions();

  const fetchDealsScoped = useCallback(
    (page: number, limit: number, search: string, extraParams: Record<string, string | number> = {}) => {
      const merged = pipelineId !== undefined ? { ...extraParams, pipelineId } : extraParams;
      list.fetchDeals(page, limit, search, merged);
    },
    [list.fetchDeals, pipelineId],
  );

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');
  const resetPageRef = useRef<() => void>(() => { });
  const resetPage = useCallback(() => resetPageRef.current(), []);

  const filtersHook = useDealFilters(fetchDealsScoped, searchQueryRef, rowsPerPageRef, resetPage);
  const { activeFiltersRef } = filtersHook;

  const sortHook = useDealSort(fetchDealsScoped, activeFiltersRef, searchQueryRef, rowsPerPageRef, resetPage);

  const pagination = useDealPagination(fetchDealsScoped, activeFiltersRef, searchQueryRef, list.totalCount, list.totalPages);

  const [activeView, setActiveView] = useState<'deals' | 'drafts'>('deals');
  const [draftId, setDraftId] = useState<string | null>(null);
  const drafts = useDrafts('deal');
  const [previewData, setPreviewData] = useState<{ sections: PreviewSection[], payload: any, formValues: any } | null>(null);
  const [isPreviewSaving, setIsPreviewSaving] = useState(false);

  useEffect(() => {
    if (activeView === 'drafts' && drafts.length === 0) {
      setActiveView('deals');
    }
  }, [activeView, drafts.length]);

  const dealSearch = useDealSearch(fetchDealsScoped, activeFiltersRef, rowsPerPageRef, pagination.resetPage);

  useEffect(() => {
    rowsPerPageRef.current = pagination.rowsPerPage;
    searchQueryRef.current = dealSearch.searchQuery;
    resetPageRef.current = pagination.resetPage;
  });

  const [formError, setFormError] = useState('');
  const crud = useDealCrud({
    pagination: { setError: setFormError, setIsLoading: list.setIsLoading, refresh: list.refreshCurrentPage },
    showToastMessage: toast.showToastMessage,
  });
  const drawer = useDealDrawer();
  const detailDrawer = useDrawer<DealItem>();
  const deleteConfirm = useDealDeleteConfirm(crud.handleDeleteDeal);
  const actionMenu = useDealActionMenu();
  const rowActions = useDealRowActions(actionMenu, detailDrawer, deleteConfirm);

  const handleEditFromDetail = useCallback((deal: DealItem) => {
    detailDrawer.close();
    drawer.openEditDrawer(deal);
  }, [detailDrawer.close, drawer.openEditDrawer]);

  // The Kanban board has no edit form of its own, so it flips to this table
  // view and hands us the deal to open. Consume the instruction once.
  const handledInitialActionRef = useRef<DealItem | null>(null);
  useEffect(() => {
    if (!initialAction || handledInitialActionRef.current === initialAction.deal) return;
    handledInitialActionRef.current = initialAction.deal;
    if (initialAction.type === 'edit') {
      drawer.openEditDrawer(initialAction.deal);
    } else {
      deleteConfirm.handleDeleteClick(initialAction.deal);
    }
    onInitialActionHandled?.();
  }, [initialAction, drawer.openEditDrawer, deleteConfirm.handleDeleteClick, onInitialActionHandled]);

  const selection = useTableSelection<string>();
  const bulkActions = useDealBulkActions({
    selectedIds: selection.selectedIds,
    onRefresh: () => list.refreshCurrentPage(),
    onShowToast: toast.showToastMessage,
    onClearSelection: () => selection.setSelectedIds([]),
  });

  const { dealAdditionalFieldDefs } = useDealAdditionalFieldDefs();
  const { staff } = useStaffList();
  const staffOptions = useMemo(
    () => staff.map((o) => ({ value: String(o.value), label: o.label })),
    [staff],
  );

  const handleFieldSave = useCallback(
    async (dealId: string, payload: { agentId?: string; startDate?: string; endDate?: string }) => {
      try {
        const res = await dealService.updateDeal(dealId, payload);
        if (res.status) {
          list.refreshCurrentPage();
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [list.refreshCurrentPage],
  );
  const formSubmit = useDealFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddDeal: crud.handleAddDeal,
    handleUpdateDeal: crud.handleUpdateDeal,
    dealAdditionalFieldDefs,
  });

  const dealValidationSchema = useMemo(
    () => getDealValidationSchema(dealAdditionalFieldDefs, {
      startDate: drawer.editingItem?.startDate,
      endDate: drawer.editingItem?.endDate,
    }),
    [dealAdditionalFieldDefs, drawer.editingItem?.startDate, drawer.editingItem?.endDate],
  );

  const editInitialValues = useMemo((): DealFormData => {
    const additionalFieldValues = getInitialValues(dealAdditionalFieldDefs);

    if (draftId) {
      const draft = draftService.getDrafts('deal').find(d => d.id === draftId);
      if (draft) return draft.payload as DealFormData;
    }

    if (!drawer.editingItem) {
      return { ...DEAL_FORM_DEFAULT_VALUES, ...additionalFieldValues };
    }

    for (const af of drawer.editingItem.additionalFields || []) {
      const def = dealAdditionalFieldDefs.find(d => d.fieldId === af.fieldId);
      if (def) {
        additionalFieldValues[getFieldKey(def.fieldKey)] = af.value || '';
      }
    }

    const { countryCode: mobileCountryCode, number: mobileNumber } = splitMobileValue(drawer.editingItem.mobile);

    // The deal's own `agent` field only carries the staff member's numeric id,
    // not the staff_id string the Assign Agent dropdown (and the update
    // payload) use — resolve it against the loaded staff list so the dropdown
    // pre-selects instead of silently matching no option.
    const rawAgentId = drawer.editingItem.agentId;
    const agentMatch = rawAgentId
      ? formStaff.find(s => String(s.value) === String(rawAgentId) || String(s.rawId) === String(rawAgentId))
      : undefined;

    return {
      dealName: drawer.editingItem.dealName || '',
      lead: drawer.editingItem.lead || '',
      leadId: drawer.editingItem.leadId || '',
      mobile: drawer.editingItem.mobile || '',
      mobileCountryCode,
      mobileNumber,
      amount: String(drawer.editingItem.amount || '').replace(/\.00$/, ''),
      currency: drawer.editingItem.currency || DEFAULT_CURRENCY,
      status: drawer.editingItem.status || '',
      statusId: drawer.editingItem.statusId || '',
      pipelineId: drawer.editingItem.pipelineId || '',
      stageId: drawer.editingItem.stageId || drawer.editingItem.statusId || '',
      priority: drawer.editingItem.priority || '',
      type: drawer.editingItem.type || '',
      startDate: drawer.editingItem.startDate || '',
      endDate: drawer.editingItem.endDate || '',
      closeDate: drawer.editingItem.closeDate || drawer.editingItem.endDate || '',
      assignAgent: agentMatch?.label ?? (drawer.editingItem.agent || ''),
      agentId: agentMatch ? agentMatch.value : (rawAgentId || ''),
      ...additionalFieldValues,
    };
  }, [drawer.editingItem, dealAdditionalFieldDefs, formStaff, draftId]);

  const formBodyRef = useRef<HTMLDivElement>(null);

  const handleResumeDraft = (id: string) => {
    setDraftId(id);
    const draft = draftService.getDrafts('deal').find(d => d.id === id);
    if (draft) {
      setActiveView('deals');
      drawer.openAddDrawer();
    }
  };

  const handlePreviewRequest = (data: { sections: PreviewSection[], payload: any, formValues: any }) => {
    setPreviewData(data);
  };

  const handlePreviewSave = async () => {
    if (!previewData) return;
    setIsPreviewSaving(true);
    try {
      const values = previewData.payload;
      const helpers = { setSubmitting: () => { } } as any;
      const success = drawer.editingItem
        ? await formSubmit.handleEditSubmit(values, helpers)
        : await formSubmit.handleAddSubmit(values, helpers);

      if (success) {
        if (draftId) draftService.deleteDraft(draftId);
        setPreviewData(null);
        setDraftId(null);
        drawer.closeDrawer();
      }
    } finally {
      setIsPreviewSaving(false);
    }
  };

  const handleDrawerClose = () => {
    setPreviewData(null);
    setDraftId(null);
    drawer.closeDrawer();
  };

  // Fetches on mount, then again whenever the board's selected pipeline
  // changes (pipelineId starts undefined/null while the picker's own
  // pipelines list is still loading, then resolves to a number - both count
  // as "changed" so the table re-scopes as soon as a pipeline is picked).
  const initialFetchDone = useRef(false);
  const prevPipelineIdRef = useRef(pipelineId);
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      prevPipelineIdRef.current = pipelineId;
      fetchDealsScoped(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
      return;
    }
    if (prevPipelineIdRef.current === pipelineId) return;
    prevPipelineIdRef.current = pipelineId;
    resetPage();
    fetchDealsScoped(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineId, fetchDealsScoped]);

  useEffect(() => {
    if (!drawer.editingItem) return;
    const updated = list.dealList.find(d => d.id === drawer.editingItem!.id);
    if (updated && updated.createdAt !== drawer.editingItem!.createdAt) {
      drawer.openEditDrawer(updated);
    }
  }, [list.dealList, drawer.editingItem, drawer.openEditDrawer]);

  useEffect(() => {
    if (!detailDrawer.item) return;
    const updated = list.dealList.find(d => d.id === detailDrawer.item!.id);
    if (updated && updated.createdAt !== detailDrawer.item!.createdAt) {
      detailDrawer.open(updated);
    }
  }, [list.dealList, detailDrawer.item, detailDrawer.open]);

  const paginatedIds = useMemo(() => getDealIds(list.dealList), [list.dealList]);

  const clearFilters = useDealClearFilters(filtersHook, dealSearch, pagination, sortHook, fetchDealsScoped, rowsPerPageRef);

  const columns = useMemo(() => getDealColumns(list.dealList), [list.dealList]);

  const additionalFieldColumnNames = useMemo(() => {
    const names = new Set<string>();
    for (const row of list.dealList) {
      for (const af of row.additionalFields || []) {
        names.add(af.name);
      }
    }
    return [...names];
  }, [list.dealList]);

  const { hasTemplates: hasWhatsappTemplates, isLoading: whatsappTemplatesLoading, hasError: whatsappTemplatesError } = useActiveWhatsappTemplates();

  const handleSendWhatsapp = (item: DealItem, message?: string) => {
    if (!item.mobile) {
      toast.showToastMessage('Phone number is not available.', 'error');
      return;
    }
    window.open(buildWhatsappUrl(item.mobile, message), '_blank');
  };

  const handleMessage = (item: DealItem) => {
    if (!item.mobile) {
      toast.showToastMessage('Phone number is not available.', 'error');
      return;
    }
    const digits = item.mobile.replace(/[^0-9]/g, '');
    window.open(`sms:${digits}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track sales opportunities, aiding management and conversion of potential customers."
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            {headerExtra}
            {drafts.length > 0 && (
              <button
                className={`btn ${activeView === 'drafts' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveView(activeView === 'drafts' ? 'deals' : 'drafts')}
              >
                {activeView === 'drafts' ? <><Briefcase size={16} /> Back to Deals</> : <><FileText size={16} /> Drafts</>}
              </button>
            )}
          </div>
        }
      />

      {belowHeader}

      {list.error && !drawer.showDrawer && activeView === 'deals' && (
        <div className="error-banner">
          <span>{list.error}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => fetchDealsScoped(pagination.currentPage, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current)}>Retry</button>
        </div>
      )}

      {activeView === 'drafts' && <DraftsList type="deal" onResumeDraft={handleResumeDraft} />}

      {activeView === 'deals' && (
        <div className="table-container">
          <TableNav
            searchQuery={dealSearch.searchQuery}
            onSearchChange={dealSearch.setSearchQuery}
            searchPlaceholder="Search deals..."
            rowsPerPage={pagination.rowsPerPage}
            onRowsPerPageChange={pagination.handleRowsPerPageChange}
          >
            <button className="btn btn-secondary" onClick={() => filtersHook.setShowFilters(!filtersHook.showFilters)}>
              <Filter size={16} /> Filter <ChevronDown size={14} className={filtersHook.showFilters ? 'rotate' : ''} />
            </button>

            <DealSortDropdown
              sortBy={sortHook.sortConfig.key}
              sortOrder={sortHook.sortConfig.direction}
              onSortChange={(field: string, direction: string) => {
                if (direction === 'desc') sortHook.handleSortDesc(field);
                else sortHook.handleSortAsc(field);
              }}
            />

            <DealBulkActionsDropdown
              selectedCount={selection.selectedIds.length}
              onChangeStage={bulkActions.handleChangeStageClick}
              onReassignOwner={bulkActions.handleReassignOwnerClick}
            />

            <button className="btn btn-primary" onClick={() => { filtersHook.setShowFilters(false); setDraftId(null); drawer.openAddDrawer(); }}>
              <Plus size={16} /> Add Deal
            </button>
          </TableNav>

          {filtersHook.showFilters && (
            <DealFilters
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
                        checked={list.dealList.length > 0 && selection.selectedIds.length === list.dealList.length}
                        onChange={(e) => selection.handleSelectAll(list.dealList.map(d => String(d.id)), e.target.checked)}
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
              {list.error && !list.isLoading ? (
                <EmptyState colSpan={columns.length} message={list.error} />
              ) : list.dealList.length === 0 && !list.isLoading ? (
                <EmptyState colSpan={columns.length} message={LABEL_NO_DATA} />
              ) : (
                list.dealList.map(deal => (
                  <DealRow
                    key={deal.id}
                    deal={deal}
                    columns={columns}
                    additionalFieldColumns={additionalFieldColumnNames}
                    isSelected={selection.isSelected(String(deal.id))}
                    onSelectRow={() => selection.handleSelectRow(String(deal.id))}
                    actionMenu={{
                      isOpen: actionMenu.openId === deal.id,
                      buttonRect: actionMenu.openId === deal.id ? actionMenu.buttonRect : null,
                      onOpen: actionMenu.open,
                      onClose: actionMenu.close,
                    }}
                    onViewDeal={detailDrawer.open}
                    onEditDeal={drawer.openEditDrawer}
                    onDeleteDeal={rowActions.handleDeleteFromRow}
                    onSendWhatsapp={handleSendWhatsapp}
                    onMessage={handleMessage}
                    hasWhatsappTemplates={hasWhatsappTemplates}
                    whatsappTemplatesLoading={whatsappTemplatesLoading}
                    whatsappTemplatesError={whatsappTemplatesError}
                    staffOptions={staffOptions}
                    onFieldSave={handleFieldSave}
                  />
                ))
              )}
            </TBody>
          </Table>

          {list.isLoading && <div className="table-loading">Loading...</div>}

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={list.totalPages}
            totalItems={pagination.totalItems}
            rowsPerPage={pagination.rowsPerPage}
            onPageChange={pagination.handleSetCurrentPage}
          />
        </div>
      )}

      {previewData ? (
        <PreviewCanvas
          isOpen={true}
          title={drawer.editingItem ? 'Preview Edit' : 'Preview Deal'}
          subtitle="Review the details before saving"
          sections={previewData.sections}
          isSaving={isPreviewSaving}
          error={formError}
          onClose={() => { handleDrawerClose(); setFormError(''); }}
          onEdit={() => { setPreviewData(null); setFormError(''); }}
          onSave={handlePreviewSave}
        />
      ) : (
        <Drawer ref={formBodyRef} isOpen={drawer.showDrawer} onClose={handleDrawerClose} title={drawer.editingItem ? 'Edit Deal' : 'Add Deal'}>
          <DealForm
            key={drawer.editingItem ? `edit-${drawer.editingItem.id}` : 'add-drawer'}
            editingItem={drawer.editingItem}
            draftId={draftId}
            initialDraftValues={editInitialValues}
            validationSchema={dealValidationSchema}
            initialValues={editInitialValues}
            onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleAddSubmit}
            onPreviewRequest={handlePreviewRequest}
            onDraftSaved={setDraftId}
            isLoading={list.isLoading}
            error={formError}
            onCancel={handleDrawerClose}
            scrollContainerRef={formBodyRef}
          />
        </Drawer>
      )}

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.dealName || ''}
        error={formError}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={() => { setFormError(''); deleteConfirm.closeDeleteModal(); }}
      />

      <BulkChangeStageModal
        isOpen={bulkActions.showChangeStageModal}
        selectedCount={selection.selectedIds.length}
        isProcessing={bulkActions.isProcessing}
        pipelineId={pipelineId}
        onConfirm={bulkActions.handleConfirmChangeStage}
        onClose={() => bulkActions.setShowChangeStageModal(false)}
      />

      <BulkReassignOwnerModal
        isOpen={bulkActions.showReassignOwnerModal}
        selectedCount={selection.selectedIds.length}
        isProcessing={bulkActions.isProcessing}
        onConfirm={bulkActions.handleConfirmReassignOwner}
        onClose={() => bulkActions.setShowReassignOwnerModal(false)}
      />

      <DealDetailDrawer
        deal={detailDrawer.item}
        isOpen={detailDrawer.isOpen}
        onClose={detailDrawer.close}
        onDealUpdated={list.refreshCurrentPage}
        onEditDeal={handleEditFromDetail}
        onDeleteDeal={rowActions.handleDeleteFromDrawer}
      />

      <Toast
        message={toast.toastMessage}
        type={toast.toastType}
        isVisible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default DealPage;
