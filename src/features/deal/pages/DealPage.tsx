import { Search, Filter, ChevronDown, ArrowUp, ArrowDown, Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { useDealPage } from '../hooks';
import DeleteDealModal from '../components/DeleteDealModal';
import DealActionMenu from '../components/DealActionMenu';
import { DEAL_STATUS_LABEL_MAP, DEAL_STATUS_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
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
  const {
    searchQuery, setSearchQuery,
    deal,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    totalCount,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    rowsPerPage,
    handleDrawerSave,

    totalDealAmount, //statitics
    totalDealsCount,

    showFilters,
    setShowFilters, //filters
    dealFilters,
    setDealFilters,
    clearFilters,

    sortBy, //sort
    sortOrder,
    handleSortChange,

    showSortDropdown, //dropdown
    setShowSortDropdown,

    actionMenuOpen, //action
    setActionMenuOpen,

    paginatedData,
    currentPage,
    setCurrentPage,
    handleRowsPerPageChange,
    totalPages,
    hasNext,
    hasPrevious, //pagination
    startIndex,
    handleAddDeal,
    handleEditDeal,  //crud api
    handleDeleteDeal,

    handleExportCSV,
  } = useDealPage();

  return (
    <PageContainer>
      <PageHeader
        title="Deals"
        description="Track sales opportunities, aiding management and conversion of potential customers."
      />

      <div className="deals-stats-row">
        <div className="stat-item">
          <span className="stat-label">Total Deal Amount:</span>
          <span className="stat-value">₹{totalDealAmount.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Deals Count:</span>
          <span className="stat-value">{totalDealsCount}</span>
        </div>
      </div>

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <ArrowUp size={16} />
              Sort By
              <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
            </button>
            {showSortDropdown && (
              <div className="premium-dropdown sort-dropdown dropup">
                <div className="dropdown-header">Sort By</div>
                <button
                  className={`dropdown-item ${sortBy === 'createdAt' && sortOrder === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('createdAt', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Newest First</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'createdAt' && sortOrder === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('createdAt', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Oldest First</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'amount' && sortOrder === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('amount', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Highest Amount</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'amount' && sortOrder === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('amount', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Lowest Amount</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'startDate' && sortOrder === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('startDate', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Start Date (Newest)</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'startDate' && sortOrder === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('startDate', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Start Date (Oldest)</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'dealName' && sortOrder === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('dealName', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Name (A-Z)</span>
                </button>
                <button
                  className={`dropdown-item ${sortBy === 'dealName' && sortOrder === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortChange('dealName', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Name (Z-A)</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary" onClick={handleAddDeal}>
            <Plus size={16} />
            Deals
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Status</label>
              <select value={dealFilters.status} onChange={(e) => setDealFilters({ ...dealFilters, status: e.target.value })}>
                <option value="">All</option>
                <option value="win">Deal Win</option>
                <option value="lost">Deal Lost</option>
                <option value="invoice">Invoice</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Type</label>
              <select value={dealFilters.type} onChange={(e) => setDealFilters({ ...dealFilters, type: e.target.value })}>
                <option value="">All</option>
                <option value="sales">Sales</option>
                <option value="registration">Registration</option>
                <option value="renewal">Renewal</option>
                <option value="upsell">Upsell</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={dealFilters.assignedTo} onChange={(e) => setDealFilters({ ...dealFilters, assignedTo: e.target.value })}>
                <option value="">Select</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {deal.isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <span>Loading deals...</span>
        </div>
      )}

      {deal.error && (
        <div className="error-banner">
          <span>{deal.error}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => deal.fetchDeals()}>Retry</button>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Deal Name</th>
              <th>Lead</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Agent</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && !deal.isLoading && (
              <tr>
                <td colSpan={12} className="empty-state">No deals found</td>
              </tr>
            )}
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td className="action-cell">
                  <DealActionMenu
                    isOpen={actionMenuOpen === row.id}
                    onToggle={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}
                    onClose={() => setActionMenuOpen(null)}
                    row={row}
                    onEdit={handleEditDeal}
                    onDelete={handleDeleteDeal}
                  />
                </td>
                <td className="lead-name-cell">{row.dealName}</td>
                <td>{row.lead}</td>
                <td>{row.mobile || row.phone || row.phoneNumber || ''}</td>
                <td>₹{Number(row.amount).toLocaleString()}</td>
                <td>{getStatusBadge(row.status || '')}</td>
                <td>{getTypeBadge(row.type || '')}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.agent}</td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Show entries:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalCount)} of {totalCount}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={!hasPrevious} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={!hasPrevious} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={!hasNext} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={!hasNext} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>

      
    

      <AddDealDrawer
        key={editingItem ? `edit-${editingItem.id}` : 'add-drawer'}
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        deal={editingItem ? {
          dealName: editingItem.dealName || '',
          lead: editingItem.lead || '',
          leadId: editingItem.leadId,
          mobile: editingItem.mobile || '',
          amount: String(editingItem.amount || '').replace(/\.00$/, ''),
          status: (editingItem.status || '').toLowerCase(),
          type: (editingItem.type || '').toLowerCase(),
          startDate: editingItem.startDate || '',
          endDate: editingItem.endDate || '',
          assignAgent: editingItem.agent || '',
          agentId: editingItem.agentId,
        } : null}
        onSave={handleDrawerSave}
      />

      <DeleteDealModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.dealName || ''}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </PageContainer>
  );
};

export default DealPage;
