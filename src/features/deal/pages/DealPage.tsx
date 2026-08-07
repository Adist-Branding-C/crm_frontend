import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { ChevronUp, ChevronDown, Filter, Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useToast } from '../../../shared/hooks/useToast';
import { useDealList } from '../hooks/useDealList';
import { useDealPagination } from '../hooks/useDealPagination';
import { useDealSearch } from '../hooks/useDealSearch';
import { useDealSort } from '../hooks/useDealSort';
import { useDealFilters } from '../hooks/useDealFilters';
import { useDealDeleteConfirm } from '../hooks/useDealDeleteConfirm';
import { useDealActionMenu } from '../hooks/useDealActionMenu';
import { useDealRowActions } from '../hooks/useDealRowActions';
import { useDealClearFilters } from '../hooks/useDealClearFilters';
import { useDealCrud } from '../hooks/useDealCrud';
import { useDealDrawer } from '../hooks/useDealDrawer';
import { useDealFormSubmit } from '../hooks/useDealFormSubmit';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { useDealExport } from '../hooks/useDealExport';
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
import type { DealFormData } from '../../../shared/types/drawers';
import type { DealItem } from '../types/interface';
import './DealPage.css';

const DealPage = () => {
  const toast = useToast();
  const list = useDealList(toast.showToastMessage);
  const { staff: formStaff } = useDealFormOptions();

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');
  const resetPageRef = useRef<() => void>(() => {});
  const resetPage = useCallback(() => resetPageRef.current(), []);

  const filtersHook = useDealFilters(list.fetchDeals, searchQueryRef, rowsPerPageRef, resetPage);
  const { activeFiltersRef } = filtersHook;

  const sortHook = useDealSort(list.fetchDeals, activeFiltersRef, searchQueryRef, rowsPerPageRef, resetPage);

  const pagination = useDealPagination(list.fetchDeals, activeFiltersRef, searchQueryRef, list.totalCount, list.totalPages);

  const dealSearch = useDealSearch(list.fetchDeals, activeFiltersRef, rowsPerPageRef, pagination.resetPage);

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
  const deleteConfirm = useDealDeleteConfirm(crud.handleDeleteDeal);
  const actionMenu = useDealActionMenu();
  const rowActions = useDealRowActions(actionMenu, drawer, deleteConfirm);

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
      status: drawer.editingItem.status || '',
      statusId: drawer.editingItem.statusId || '',
      type: drawer.editingItem.type || '',
      typeId: drawer.editingItem.typeId || '',
      startDate: drawer.editingItem.startDate || '',
      endDate: drawer.editingItem.endDate || '',
      assignAgent: agentMatch?.label ?? (drawer.editingItem.agent || ''),
      agentId: agentMatch ? agentMatch.value : (rawAgentId || ''),
      ...additionalFieldValues,
    };
  }, [drawer.editingItem, dealAdditionalFieldDefs, formStaff]);

  const formBodyRef = useRef<HTMLDivElement>(null);

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    list.fetchDeals(1, 10, '', {});
  }, []);

  useEffect(() => {
    if (!drawer.editingItem) return;
    const updated = list.dealList.find(d => d.id === drawer.editingItem!.id);
    if (updated && updated.createdAt !== drawer.editingItem!.createdAt) {
      drawer.openEditDrawer(updated);
    }
  }, [list.dealList, drawer.editingItem, drawer.openEditDrawer]);

  const paginatedIds = useMemo(() => getDealIds(list.dealList), [list.dealList]);

  const clearFilters = useDealClearFilters(filtersHook, dealSearch, pagination, sortHook, list.fetchDeals, rowsPerPageRef);

  const { isExporting, handleExportCSV } = useDealExport(toast.showToastMessage);

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
      />

      {list.error && !drawer.showDrawer && (
        <div className="error-banner">
          <span>{list.error}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => list.fetchDeals(pagination.currentPage, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current)}>Retry</button>
        </div>
      )}

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

          <button
            className="btn btn-secondary"
            onClick={() => handleExportCSV(dealSearch.searchQuery, activeFiltersRef.current)}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>

          <button className="btn btn-primary" onClick={() => { filtersHook.setShowFilters(false); drawer.openAddDrawer(); }}>
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
                  {col.label}
                  {col.sortable && sortHook.sortConfig.key === col.key && (
                    sortHook.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
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
                  isSelected={false}
                  onSelectRow={() => {}}
                  actionMenu={{
                    isOpen: actionMenu.openId === deal.id,
                    buttonRect: actionMenu.openId === deal.id ? actionMenu.buttonRect : null,
                    onOpen: actionMenu.open,
                    onClose: actionMenu.close,
                  }}
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

      <Drawer ref={formBodyRef} isOpen={drawer.showDrawer} onClose={drawer.closeDrawer} title={drawer.editingItem ? 'Edit Deal' : 'Add Deal'}>
        <DealForm
          key={drawer.editingItem ? `edit-${drawer.editingItem.id}` : 'add-drawer'}
          editingItem={drawer.editingItem}
          validationSchema={dealValidationSchema}
          initialValues={editInitialValues}
          onSubmit={drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleAddSubmit}
          isLoading={list.isLoading}
          error={formError}
          onCancel={drawer.closeDrawer}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.dealName || ''}
        error={formError}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={() => { setFormError(''); deleteConfirm.closeDeleteModal(); }}
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
