import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreHorizontal, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { SAMPLE_LEADS, INITIAL_FILTERS, COLUMNS } from '../constants';
import type { FollowupLead, Filters, SortConfig } from '../types';
import '../../../pages/Enquiries.css';

const FollowupRequiredPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FollowupLead | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredData = useMemo(() => {
    let data = [...SAMPLE_LEADS];

    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.source) data = data.filter(item => item.source === filters.source);
    if (filters.assignedTo) data = data.filter(item => item.assignedTo === filters.assignedTo);

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof FollowupLead];
        const bVal = b[sortConfig.key as keyof FollowupLead];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setShowFilters(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Followup Required" description="Potential customers showing interest in a product or service." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
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
                <button onClick={() => setShowActionsDropdown(false)}>Delete</button>
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
                <option value="Hot Lead">Hot Lead</option>
                <option value="Cold Lead">Cold Lead</option>
                <option value="Warm Lead">Warm Lead</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
              <select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value })}>
                <option value="">All</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">All</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
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
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
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
                        <button onClick={() => { setSelectedLead(row); setIsDrawerOpen(true); setActionMenuOpen(null); }}>
                          <Eye size={14} />View
                        </button>
                        <button><Edit2 size={14} />Edit</button>
                        <button className="delete"><Trash2 size={14} />Delete</button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => { setSelectedLead(row); setIsDrawerOpen(true); }}>{row.name}</td>
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
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
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
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead && isDrawerOpen} onClose={() => { setIsDrawerOpen(false); setSelectedLead(null); }} />
    </PageContainer>
  );
};

export default FollowupRequiredPage;
