import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Filter, ChevronDown, Plus, Download } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useDropdownMenu } from '../../../shared/hooks/useDropdownMenu';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useToast } from '../../../shared/hooks/useToast';
import { useDealList, useDealCrud, useDealDrawer, useDealDeleteConfirm, useDealFormSubmit, useDealFilters, useDealClearFilters, useDealExport } from '../hooks';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import DealActionMenu from '../components/DealActionMenu';
import DealFilters from '../components/DealFilters';
import DealSortDropdown from '../components/DealSortDropdown';
import DealForm from '../components/DealForm';
import { getDealValidationSchema } from '../validations';
import { getFieldKey, getInitialValues } from '../utils/additionalFields';
import { DEAL_STATUS_LABEL_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
import type { DealFormData } from '../../../shared/types/drawers';
import type { DealItem } from '../types';
import './DealPage.css';

const getStatusBadge = (status: string) => {
  const colorMap: Record<string, string> = { win: '#10b981', lost: '#ef4444', pending: '#f59e0b', invoice: '#3b82f6' };
  const color = colorMap[status.toLowerCase()] || '#6b7280';
  const label = DEAL_STATUS_LABEL_MAP[status] || status;
  return <span className="status-pill" style={{ background: `${color}20`, color }}>{label}</span>;
};

const getTypeBadge = (type: string) => {
  const colorMap: Record<string, string> = { sales: '#10b981', registration: '#8b5cf6', renewal: '#3b82f6', upsell: '#fb923c' };
  const color = colorMap[type.toLowerCase()] || '#6b7280';
  const label = DEAL_TYPE_LABEL_MAP[type] || type;
  return <span className="type-pill" style={{ background: `${color}20`, color }}>{label}</span>;
};

const ADD_DEAL_EMPTY_VALUES: DealFormData = {
  dealName: '',
  lead: '',
  leadId: '',
  mobile: '',
  amount: '',
  status: '',
  statusId: '',
  type: '',
  typeId: '',
  startDate: '',
  endDate: '',
  assignAgent: '',
  agentId: '',
};

const DealPage = () => {
  const list = useDealList();
  const crud = useDealCrud({ pagination: { setError: list.setError, setIsLoading: list.setIsLoading, refresh: list.refreshCurrentPage } });
  const drawer = useDealDrawer();
  const deleteConfirm = useDealDeleteConfirm(crud.handleDeleteDeal);
  const { dealAdditionalFieldDefs } = useDealAdditionalFieldDefs();
  const formSubmit = useDealFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddDeal: crud.handleAddDeal,
    handleUpdateDeal: crud.handleUpdateDeal,
    dealAdditionalFieldDefs,
  });
  const dealValidationSchema = useMemo(
    () => getDealValidationSchema(dealAdditionalFieldDefs),
    [dealAdditionalFieldDefs],
  );

  const rowsPerPageRef = useRef(10);
  const searchQueryRef = useRef('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const filtersHook = useDealFilters(list.fetchDeals, searchQueryRef, rowsPerPageRef);
  const { activeFiltersRef } = filtersHook;

  const handleCommittedSearch = useCallback((value: string) => {
    searchQueryRef.current = value;
    setCurrentPage(1);
    list.fetchDeals(1, rowsPerPageRef.current, value, activeFiltersRef.current);
  }, [list.fetchDeals, activeFiltersRef]);
  const { searchValue: searchQuery, handleSearchChange: rawSearchChange, resetSearch } = useDebouncedSearch(handleCommittedSearch, 2000);
  const setSearchQuery = rawSearchChange;

  const handleSetCurrentPage = useCallback((page: number | ((prev: number) => number)) => {
    const next = typeof page === 'function' ? page(currentPage) : page;
    setCurrentPage(next);
    list.fetchDeals(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [list.fetchDeals, activeFiltersRef, currentPage]);

  const resetPage = useCallback(() => { setCurrentPage(1); }, []);

  const clearFilters = useDealClearFilters(filtersHook, resetSearch, resetPage, list.fetchDeals, rowsPerPageRef);

  const handleSortChange = useCallback((field: string, direction: string) => {
    setSortBy(field);
    setSortOrder(direction);
    setCurrentPage(1);
    const params = { ...activeFiltersRef.current, sortBy: field, sortOrder: direction };
    activeFiltersRef.current = params;
    list.fetchDeals(1, rowsPerPageRef.current, searchQueryRef.current, params);
  }, [list.fetchDeals, activeFiltersRef, rowsPerPageRef, searchQueryRef]);

  const dropdown = useDropdownMenu<number>();
  const { handleExportCSV } = useDealExport(list.dealList);
  const formBodyRef = useRef<HTMLDivElement>(null);

  const additionalFieldColumnNames = useMemo(() => {
    const names = new Set<string>();
    for (const row of list.dealList) {
      for (const af of row.additionalFields || []) {
        names.add(af.name);
      }
    }
    return [...names];
  }, [list.dealList]);

  const editInitialValues = useMemo((): DealFormData => {
    const additionalFieldValues = getInitialValues(dealAdditionalFieldDefs);

    if (!drawer.editingItem) {
      return { ...ADD_DEAL_EMPTY_VALUES, ...additionalFieldValues };
    }

    for (const af of drawer.editingItem.additionalFields || []) {
      const def = dealAdditionalFieldDefs.find(d => d.fieldId === af.fieldId);
      if (def) {
        additionalFieldValues[getFieldKey(def.fieldKey)] = af.value || '';
      }
    }

    return {
      dealName: drawer.editingItem.dealName || '',
      lead: drawer.editingItem.lead || '',
      leadId: drawer.editingItem.leadId || '',
      mobile: drawer.editingItem.mobile || '',
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

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    rowsPerPageRef.current = value;
    setCurrentPage(1);
    list.fetchDeals(1, value, searchQueryRef.current, activeFiltersRef.current);
  }, [list.fetchDeals, activeFiltersRef]);

  const handleAddDealClick = useCallback(() => {
    filtersHook.setShowFilters(false);
    drawer.openAddDrawer();
  }, [filtersHook.setShowFilters, drawer.openAddDrawer]);

  const handleDeleteRow = useCallback((id: number) => {
    const item = list.dealList.find(d => d.id === id);
    if (item) deleteConfirm.handleDeleteClick(item);
  }, [list.dealList, deleteConfirm.handleDeleteClick]);

  const toast = useToast();

  const handleWhatsApp = useCallback((item: DealItem) => {
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
  }, [toast.showToastMessage]);

  const handleMessage = useCallback((item: DealItem) => {
    if (!item.mobile) {
      toast.showToastMessage('Phone number is not available.', 'error');
      return;
    }
    const digits = item.mobile.replace(/[^0-9]/g, '');
    window.open(`sms:${digits}`);
  }, [toast.showToastMessage]);

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    list.fetchDeals(1, 10, '', {});
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track sales opportunities, aiding management and conversion of potential customers."
      />

      {list.error && (
        <div className="error-banner">
          <span>{list.error}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => list.fetchDeals(currentPage, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current)}>Retry</button>
        </div>
      )}

      <div className="table-container">
        <TableNav
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search deals..."
          rowsPerPage={rowsPerPageRef.current}
          onRowsPerPageChange={handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={() => filtersHook.setShowFilters(!filtersHook.showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={filtersHook.showFilters ? 'rotate' : ''} />
          </button>
          <DealSortDropdown sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary" onClick={handleAddDealClick}>
            <Plus size={16} />
            Deals
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
              <TCell variant="th">Action</TCell>
              <TCell variant="th">Deal Name</TCell>
              <TCell variant="th">Lead</TCell>
              <TCell variant="th">Phone</TCell>
              <TCell variant="th">Amount</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Type</TCell>
              <TCell variant="th">Start Date</TCell>
              <TCell variant="th">End Date</TCell>
              <TCell variant="th">Agent</TCell>
              <TCell variant="th">Created By</TCell>
              <TCell variant="th">Created At</TCell>
              {additionalFieldColumnNames.map(name => (
                <TCell variant="th" key={name}>{name}</TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {list.dealList.length === 0 && !list.isLoading ? (
              <EmptyState colSpan={12 + additionalFieldColumnNames.length} message="No deals found" />
            ) : (
              list.dealList.map(row => (
                <TRow key={row.id}>
                  <TCell className="action-cell">
                    <DealActionMenu
                      isOpen={dropdown.dropdownOpen === row.id}
                      onToggle={() => dropdown.toggleDropdown(dropdown.dropdownOpen === row.id ? null : row.id)}
                      onClose={dropdown.closeDropdown}
                      row={row}
                      onEdit={drawer.openEditDrawer}
                      onDelete={handleDeleteRow}
                      onWhatsApp={handleWhatsApp}
                      onMessage={handleMessage}
                    />
                  </TCell>
                  <TCell className="lead-name-cell">{row.dealName}</TCell>
                  <TCell>{row.lead}</TCell>
                  <TCell>{row.mobile || ''}</TCell>
                  <TCell>₹{Number(row.amount).toLocaleString()}</TCell>
                  <TCell>{getStatusBadge(row.status || '')}</TCell>
                  <TCell>{getTypeBadge(row.type || '')}</TCell>
                  <TCell>{row.startDate}</TCell>
                  <TCell>{row.endDate}</TCell>
                  <TCell>{row.agent}</TCell>
                  <TCell>{row.createdBy}</TCell>
                  <TCell>{row.createdAt}</TCell>
                  {additionalFieldColumnNames.map(name => (
                    <TCell key={name}>{row.additionalFields?.find(af => af.name === name)?.value ?? ''}</TCell>
                  ))}
                </TRow>
              ))
            )}
          </TBody>
        </Table>

        {list.isLoading && <div className="table-loading">Loading...</div>}

        <Pagination
          currentPage={currentPage}
          totalPages={list.totalPages}
          totalItems={list.totalCount}
          rowsPerPage={rowsPerPageRef.current}
          onPageChange={handleSetCurrentPage}
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
