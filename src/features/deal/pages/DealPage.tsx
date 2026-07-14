import { useCallback, useMemo } from 'react';
import { Filter, ChevronDown, Plus, Download } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useDropdownMenu } from '../../../shared/hooks/useDropdownMenu';
import { useDealList, useDealCrud, useDealDrawer, useDealDeleteConfirm, useDealFormSubmit, useDealFilters, useDealExport } from '../hooks';
import DealActionMenu from '../components/DealActionMenu';
import DealFilters from '../components/DealFilters';
import DealSortDropdown from '../components/DealSortDropdown';
import DealForm from '../components/DealForm';
import { DEAL_STATUS_LABEL_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
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

const DealPage = () => {
  const list = useDealList();
  const crud = useDealCrud({ pagination: list });
  const drawer = useDealDrawer();
  const deleteConfirm = useDealDeleteConfirm(crud.handleDeleteDeal);
  const formSubmit = useDealFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddDeal: crud.handleAddDeal,
    handleUpdateDeal: crud.handleUpdateDeal,
  });
  const filters = useDealFilters(list.dealList);
  const dropdown = useDropdownMenu<number>();
  const { handleExportCSV } = useDealExport(filters.filteredData);

  const totalDealAmount = useMemo(
    () => filters.filteredData.reduce((sum, d) => sum + (Number(d.amount) || 0), 0),
    [filters.filteredData],
  );

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    list.setPageNumber(1);
    list.setLimit(Number(e.target.value));
  }, [list.setPageNumber, list.setLimit]);

  const handleAddDealClick = useCallback(() => {
    filters.setShowFilters(false);
    drawer.openAddDrawer();
  }, [filters.setShowFilters, drawer.openAddDrawer]);

  const handleApplyFilters = useCallback(() => {
    filters.setShowFilters(false);
  }, [filters.setShowFilters]);

  const handleDeleteRow = useCallback((id: number) => {
    const item = list.dealList.find(d => d.id === id);
    if (item) deleteConfirm.handleDeleteClick(item);
  }, [list.dealList, deleteConfirm.handleDeleteClick]);

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track sales opportunities, aiding management and conversion of potential customers."
      />

      {/* <div className="deals-stats-row">
        <div className="stat-item">
          <span className="stat-label">Total Deal Amount:</span>
          <span className="stat-value">₹{totalDealAmount.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Deals Count:</span>
          <span className="stat-value">{list.totalCount}</span>
        </div>
      </div> */}

      {list.isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <span>Loading deals...</span>
        </div>
      )}

      {list.error && (
        <div className="error-banner">
          <span>{list.error}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => list.refresh()}>Retry</button>
        </div>
      )}

      <div className="table-container">
        <TableNav
          searchQuery={list.searchQuery}
          onSearchChange={list.handleSearchChange}
          searchPlaceholder="Search deals..."
          rowsPerPage={list.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={() => filters.setShowFilters(!filters.showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={filters.showFilters ? 'rotate' : ''} />
          </button>
          <DealSortDropdown sortBy={list.sortBy} sortOrder={list.sortOrder} onSortChange={list.handleSortChange} />
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary" onClick={handleAddDealClick}>
            <Plus size={16} />
            Deals
          </button>
        </TableNav>

        {filters.showFilters && (
          <DealFilters
            filters={filters.filters}
            onFilterChange={filters.setFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={filters.clearFilters}
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
            </TRow>
          </THead>
          <TBody>
            {filters.filteredData.length === 0 && !list.isLoading ? (
              <EmptyState colSpan={12} message="No deals found" />
            ) : (
              filters.filteredData.map(row => (
                <TRow key={row.id}>
                  <TCell className="action-cell">
                    <DealActionMenu
                      isOpen={dropdown.dropdownOpen === row.id}
                      onToggle={() => dropdown.toggleDropdown(dropdown.dropdownOpen === row.id ? null : row.id)}
                      onClose={dropdown.closeDropdown}
                      row={row}
                      onEdit={drawer.openEditDrawer}
                      onDelete={handleDeleteRow}
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
                </TRow>
              ))
            )}
          </TBody>
        </Table>

        <Pagination
          currentPage={list.pageNumber}
          totalPages={list.totalPages}
          totalItems={list.totalCount}
          rowsPerPage={list.limit}
          onPageChange={list.setPageNumber}
        />
      </div>

      <Drawer isOpen={drawer.showDrawer} onClose={drawer.closeDrawer} title={drawer.editingItem ? 'Edit Deal' : 'Add Deal'}>
        <DealForm
          key={drawer.editingItem ? `edit-${drawer.editingItem.id}` : 'add-drawer'}
          initialValues={drawer.editingItem ? {
            dealName: drawer.editingItem.dealName || '',
            lead: drawer.editingItem.lead || '',
            leadId: drawer.editingItem.leadId,
            mobile: drawer.editingItem.mobile || '',
            amount: String(drawer.editingItem.amount || '').replace(/\.00$/, ''),
            status: (drawer.editingItem.status || '').toLowerCase(),
            type: (drawer.editingItem.type || '').toLowerCase(),
            startDate: drawer.editingItem.startDate || '',
            endDate: drawer.editingItem.endDate || '',
            assignAgent: drawer.editingItem.agent || '',
            agentId: drawer.editingItem.agentId,
          } : null}
          onSave={formSubmit.handleDrawerSave}
          onCancel={drawer.closeDrawer}
        />
      </Drawer>

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.dealName || ''}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />
    </PageContainer>
  );
};

export default DealPage;
