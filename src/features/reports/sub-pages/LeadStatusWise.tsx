import React, { useState, useRef } from 'react';
import {
  Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import './ReportsSubPages.css';
import {
  statusWiseData as statusData, statusWiseStatsCards as statsCards,
  statusWiseColumns as columns
} from '../constants/matrixReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { LEAD_STATUS_OPTIONS } from '../../../shared/constants/leadStatuses';
import { REPT_LEAD_TYPE_OPTIONS, REPT_PURPOSE_OPTIONS, REPT_SOURCE_OPTIONS } from '../constants';
import { MOCK_STAFF_SHORT } from '../../../shared/constants/mockStaff';
import type { LeadStatusWiseFilters } from '../types';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

const LeadStatusWise: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'total', direction: 'desc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const [filters, setFilters] = useState<LeadStatusWiseFilters>({
    dateRange: { start: '', end: '' },
    sortBy: '',
    staff: '',
    leadType: '',
    purpose: '',
    source: '',
    status: ''
  });

  const calculateDropdownPosition = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return { vertical: 'bottom', horizontal: 'right' };
    const rect = buttonRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dropdownHeight = 220;
    const dropdownWidth = 160;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = viewportWidth - rect.right;
    const spaceLeft = rect.left;
    let vertical = 'bottom';
    let horizontal = 'right';
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) { vertical = 'top'; }
    if (spaceRight < dropdownWidth && spaceLeft > spaceRight) { horizontal = 'left'; }
    return { vertical, horizontal };
  };

  const filteredData = React.useMemo(() => {
    let data = [...statusData];
    if (searchQuery) {
      data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filters.staff) { data = data.filter(item => item.agentName === filters.staff); }
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] as string | number;
        const bVal = b[sortConfig.key] as string | number;
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
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) { setSelectedRows(paginatedData.map(item => item.id)); }
    else { setSelectedRows([]); }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ dateRange: { start: '', end: '' }, sortBy: '', staff: '', leadType: '', purpose: '', source: '', status: '' });
    setShowFilters(false);
  };

  const handleExport = () => {
    const headers = ['Agent Name', 'Total', 'New', 'Connected', 'Interested', 'Registered', 'Not Interested', 'Just Enquiry', 'Details Shared', 'Webinar Attended', 'Lost', 'DND', 'Later'];
    const csvContent = [headers.join(','), ...statusData.map(d => [d.agentName, d.total, d.new, d.connected, d.interested, d.registered, d.notInterested, d.justEnquiry, d.detailsShared, d.webinarAttended, d.lost, d.dnd, d.later].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBlobDownload(blob, 'lead_status_report.csv');
  };

  return (
    <div className="enquiries-page">
      <div className="stats-cards-grid">
        {statsCards.map((stat) => (
          <div key={stat.key} className="stats-card">
            <div className="stats-card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stats-card-content">
              <span className="stats-card-value">{stat.value}</span>
              <span className="stats-card-label">{stat.label}</span>
            </div>
            <span className="stats-card-change" style={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
          <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search reports..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="search-input" />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
              </div>
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select value={filters.sortBy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, sortBy: e.target.value })}>
                <option value="">All</option>
                <option value="assignedDate">Assigned Date</option>
                <option value="createdDate">Created Date</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
                <select value={filters.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, status: e.target.value })}>
                  <option value="">Select</option>
                  {LEAD_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            <div className="filter-group">
              <label>Select Staff</label>
                <select value={filters.staff} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, staff: e.target.value })}>
                  <option value="">All Staff</option>
                  {MOCK_STAFF_SHORT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Lead Type</label>
                <select value={filters.leadType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, leadType: e.target.value })}>
                  <option value="">Select</option>
                  {REPT_LEAD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            <div className="filter-group">
              <label>Purpose</label>
                <select value={filters.purpose} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, purpose: e.target.value })}>
                  <option value="">Select</option>
                  {REPT_PURPOSE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
                <select value={filters.source} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, source: e.target.value })}>
                  <option value="">Select</option>
                  {REPT_SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary">{ACTION_FILTER}</button>
              <button className="btn btn-secondary" onClick={clearFilters}>{ACTION_CLEAR}</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                  {col.key === 'checkbox' ? (
                    <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
                  ) : (
                    <>
                      {col.label}
                      {col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronDown size={14} /> : <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />)}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" ref={(el) => { actionMenuRefs.current[row.id] = el as HTMLButtonElement | null; }} onClick={() => { if (actionMenuOpen === row.id) { setActionMenuOpen(null); } else { const pos = calculateDropdownPosition(actionMenuRefs.current[row.id] as HTMLButtonElement | null); setActionMenuPosition(pos); setActionMenuOpen(row.id); }}}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && (
                      <div className={`action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`}>
                        <button onClick={() => { alert(`Viewing details for: ${row.agentName}`); setActionMenuOpen(null); }}>View Details</button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="agent-cell">
                    <div className="agent-avatar">{row.initials}</div>
                    <span className="agent-name">{row.agentName}</span>
                  </div>
                </td>
                <td><strong>{row.total}</strong></td>
                <td>{row.new}</td>
                <td>{row.connected}</td>
                <td><span className="badge badge-active">{row.interested}</span></td>
                <td><span className="badge badge-pending">{row.registered}</span></td>
                <td><span className="badge badge-inactive">{row.notInterested}</span></td>
                <td>{row.justEnquiry}</td>
                <td>{row.detailsShared}</td>
                <td>{row.webinarAttended}</td>
                <td><span className="badge badge-cold-lead">{row.lost}</span></td>
                <td>{row.dnd}</td>
                <td>{row.later}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}</span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default LeadStatusWise;
