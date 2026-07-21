import React, { useRef, useEffect, useMemo } from 'react';
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
import { useDealExport } from '../hooks/useDealExport';
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

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');

  const filtersHook = useDealFilters(list.fetchDeals, searchQueryRef, rowsPerPageRef);
  const { activeFiltersRef } = filtersHook;

  const sortHook = useDealSort(list.fetchDeals, activeFiltersRef, searchQueryRef, rowsPerPageRef);

  const pagination = useDealPagination(list.fetchDeals, activeFiltersRef, searchQueryRef, list.totalCount);

  const dealSearch = useDealSearch(list.fetchDeals, activeFiltersRef, rowsPerPageRef, pagination.resetPage);

  useEffect(() => {
    rowsPerPageRef.current = pagination.rowsPerPage;
    searchQueryRef.current = dealSearch.searchQuery;
  });

  const crud = useDealCrud({ pagination: { setError: list.setError, setIsLoading: list.setIsLoading, refresh: list.refreshCurrentPage } });
  const drawer = useDealDrawer();
  const deleteConfirm = useDealDeleteConfirm(crud.handleDeleteDeal);
  const actionMenu = useDealActionMenu();
  const rowActions = useDealRowActions(actionMenu, drawer, deleteConfirm);

  const { dealAdditionalFieldDefs } = useDealAdditionalFieldDefs();
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
      assignAgent: drawer.editingItem.agent || '',
      agentId: drawer.editingItem.agentId || '',
      ...additionalFieldValues,
    };
  }, [drawer.editingItem, dealAdditionalFieldDefs]);

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

  const { handleExportCSV } = useDealExport(list.dealList);

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

  const handleWhatsApp = (item: DealItem) => {
    if (!item.mobile) {
      toast.showToastMessage('Phone number is not available.', 'error');
      return;
    }
    const digits = item.mobile.replace(/[^0-9]/g, '');
    let number: string;
    if (digits.length === 10) {
      number = `91${digits}`;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      number = digits;
    } else {
      number = digits;
    }
    window.open(`https://wa.me/${number}`, '_blank');
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

      {list.error && (
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

          <button className="btn btn-secondary" onClick={handleExportCSV}>
            Export
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
            {list.dealList.length === 0 && !list.isLoading ? (
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
                  onWhatsApp={handleWhatsApp}
                  onMessage={handleMessage}
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
          error={list.error}
          onCancel={drawer.closeDrawer}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.dealName || ''}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
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
