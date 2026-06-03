import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreHorizontal, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { COLUMNS } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING } from '../../../shared/constants/statuses';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE, ACTION_FILTER, ACTION_CLEAR, ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { LABEL_ROWS_PER_PAGE } from '../../../shared/constants/labels';
import { LEAD_TYPE_OPTIONS } from '../../../shared/constants/leadTypes';
import { SOURCE_OPTIONS } from '../../../shared/constants/sources';
import { MOCK_STAFF_OPTIONS } from '../../../shared/constants/mockStaff';
import { useFollowupData } from '../hooks/useFollowupData';
import './FollowupRequiredPage.css';

const FollowupRequiredPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    sortConfig,
    actionMenuOpen,
    setActionMenuOpen,
    isDrawerOpen,
    showSortDropdown,
    setShowSortDropdown,
    showActionsDropdown,
    setShowActionsDropdown,
    selectedLead,
    filters,
    setFilters,
    totalPages,
    startIndex,
    paginatedData,
    filteredData,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleRowsPerPageChange,
    clearFilters,
    handleViewLead,
    handleCloseDrawer,
  } = useFollowupData();

  return (
    <PageContainer>
      <PageHeader title="Followup Required" description="Potential customers showing interest in a product or service." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={ACTION_SEARCH}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            {ACTION_FILTER}
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              Sort By
              <ChevronDown size={14} />
            </button>
            {showSortDropdown && (
              <div className="sort-dropdown">
                <button onClick={() => { handleSort('createdAt'); setShowSortDropdown(false); }}>
                  Created Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
                <button onClick={() => { handleSort('nextFollowUp'); setShowSortDropdown(false); }}>
                  Next Follow Up {sortConfig.key === 'nextFollowUp' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
                <button onClick={() => { handleSort('name'); setShowSortDropdown(false); }}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            )}
          </div>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowActionsDropdown(!showActionsDropdown)}>
              Actions
              <ChevronDown size={14} />
            </button>
            {showActionsDropdown && (
              <div className="actions-dropdown">
                <button onClick={() => setShowActionsDropdown(false)}>Bulk Update</button>
                <button onClick={() => setShowActionsDropdown(false)}>Update Status</button>
                <button onClick={() => setShowActionsDropdown(false)}>Assign Agent</button>
                <button onClick={() => setShowActionsDropdown(false)}>{ACTION_DELETE}</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Type</label>
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All</option>
                {LEAD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value={STATUS_ACTIVE}>{STATUS_ACTIVE}</option>
                <option value={STATUS_INACTIVE}>{STATUS_INACTIVE}</option>
                <option value={STATUS_PENDING}>{STATUS_PENDING}</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
              <select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value })}>
                <option value="">All</option>
                {SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">All</option>
                {MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} />
              </div>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>{ACTION_FILTER}</button>
              <button className="btn btn-secondary" onClick={clearFilters}>{ACTION_CLEAR}</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                  {col.key === 'checkbox' ? (
                    <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
                  ) : (
                    <>
                      {col.label}
                      {col.sortable && sortConfig.key === col.key && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && (
                      <div className="action-dropdown">
                        <button onClick={() => handleViewLead(row)}>
                          <Eye size={14} />{ACTION_VIEW}
                        </button>
                        <button><Edit2 size={14} />{ACTION_EDIT}</button>
                        <button className="delete"><Trash2 size={14} />{ACTION_DELETE}</button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => handleViewLead(row)}>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td><span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span></td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>{row.source}</td>
                <td>{row.createdAt}</td>
                <td>{row.updatedAt}</td>
                <td>{row.nextFollowUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">{LABEL_ROWS_PER_PAGE}</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead && isDrawerOpen} onClose={handleCloseDrawer} />
    </PageContainer>
  );
};

export default FollowupRequiredPage;
