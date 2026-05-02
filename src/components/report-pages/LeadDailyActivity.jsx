import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Download, RefreshCw, ArrowUpDown, ArrowDown, ArrowUp, Edit2, Trash2, Eye, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import '../../pages/Enquiries.css';

const sampleDailyData = [
  { id: 1, date: '2024-01-25', newLeads: 25, followups: 45, conversions: 8, calls: 120, revenue: 250000 },
  { id: 2, date: '2024-01-24', newLeads: 32, followups: 52, conversions: 12, calls: 145, revenue: 380000 },
  { id: 3, date: '2024-01-23', newLeads: 18, followups: 38, conversions: 5, calls: 98, revenue: 150000 },
  { id: 4, date: '2024-01-22', newLeads: 28, followups: 48, conversions: 10, calls: 132, revenue: 320000 },
  { id: 5, date: '2024-01-21', newLeads: 35, followups: 55, conversions: 15, calls: 158, revenue: 450000 },
  { id: 6, date: '2024-01-20', newLeads: 22, followups: 42, conversions: 7, calls: 110, revenue: 180000 },
  { id: 7, date: '2024-01-19', newLeads: 30, followups: 50, conversions: 11, calls: 140, revenue: 350000 },
  { id: 8, date: '2024-01-18', newLeads: 20, followups: 40, conversions: 6, calls: 100, revenue: 160000 },
  { id: 9, date: '2024-01-17', newLeads: 27, followups: 46, conversions: 9, calls: 125, revenue: 280000 },
  { id: 10, date: '2024-01-16', newLeads: 33, followups: 53, conversions: 13, calls: 150, revenue: 400000 },
  { id: 11, date: '2024-01-15', newLeads: 24, followups: 44, conversions: 8, calls: 118, revenue: 220000 },
  { id: 12, date: '2024-01-14', newLeads: 31, followups: 51, conversions: 12, calls: 142, revenue: 360000 },
];

const LeadDailyActivity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef({});
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const sortDropdownRef = useRef(null);
  const actionsDropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    assignedTo: '',
    status: ''
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
          }, 150);
        }
      }
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target)) {
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
          }, 150);
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
          }, 150);
        }
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
          }, 150);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSortDropdown, showActionsDropdown]);

  const calculateDropdownPosition = (buttonRef) => {
    if (!buttonRef) return { vertical: 'bottom', horizontal: 'right' };
    
    const button = buttonRef;
    const rect = button.getBoundingClientRect();
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
    
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      vertical = 'top';
    }
    
    if (spaceRight < dropdownWidth && spaceLeft > spaceRight) {
      horizontal = 'left';
    }
    
    return { vertical, horizontal };
  };

  const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'newLeads', label: 'New Leads', sortable: true },
    { key: 'followups', label: 'Followups', sortable: true },
    { key: 'conversions', label: 'Conversions', sortable: true },
    { key: 'calls', label: 'Calls', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true }
  ];

  const filteredData = React.useMemo(() => {
    let data = [...sampleDailyData];

    if (searchQuery) {
      data = data.filter(item =>
        item.date.includes(searchQuery) ||
        item.newLeads.toString().includes(searchQuery) ||
        item.followups.toString().includes(searchQuery)
      );
    }

    if (filters.assignedTo) {
      data = data.filter(item => item.assignedTo === filters.assignedTo);
    }

    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const closeSortDropdown = () => {
    setSortDropdownClosing(true);
    setTimeout(() => {
      setShowSortDropdown(false);
      setSortDropdownClosing(false);
    }, 150);
  };

  const closeActionsDropdown = () => {
    setActionsDropdownClosing(true);
    setTimeout(() => {
      setShowActionsDropdown(false);
      setActionsDropdownClosing(false);
    }, 150);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDesc = (key) => {
    setSortConfig({ key, direction: 'desc' });
  };

  const handleSortAsc = (key) => {
    setSortConfig({ key, direction: 'asc' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      assignedTo: '',
      status: ''
    });
    setShowFilters(false);
  };

  const handleExport = () => {
    const headers = ['Date', 'New Leads', 'Followups', 'Conversions', 'Calls', 'Revenue'];
    const csvContent = [headers.join(','), ...sampleDailyData.map(d => [d.date, d.newLeads, d.followups, d.conversions, d.calls, d.revenue].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'daily_activity_report.csv'; link.click();
  };

  return (
    <div className="enquiries-page">
      <PageHeader title="Daily Activity Report" description="Track daily lead activities and conversions." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search reports..."
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
          <div className="dropdown-container" ref={sortDropdownRef}>
            <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); if (showSortDropdown) { closeSortDropdown(); } else { setShowSortDropdown(true); setShowActionsDropdown(false); } }}>
              <ArrowUpDown size={16} />
              Sort By
              <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
            </button>
            {showSortDropdown && (
              <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
                <div className="dropdown-header">Sort By</div>
                <button className={`dropdown-item ${sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('date'); closeSortDropdown(); }}>
                  <ArrowDown size={16} />
                  <span>Newest First</span>
                  {sortConfig.key === 'date' && sortConfig.direction === 'desc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'date' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('date'); closeSortDropdown(); }}>
                  <ArrowUp size={16} />
                  <span>Oldest First</span>
                  {sortConfig.key === 'date' && sortConfig.direction === 'asc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'newLeads' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('newLeads'); closeSortDropdown(); }}>
                  <ArrowDown size={16} />
                  <span>New Leads (High-Low)</span>
                  {sortConfig.key === 'newLeads' && sortConfig.direction === 'desc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'newLeads' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('newLeads'); closeSortDropdown(); }}>
                  <ArrowUp size={16} />
                  <span>New Leads (Low-High)</span>
                  {sortConfig.key === 'newLeads' && sortConfig.direction === 'asc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'revenue' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('revenue'); closeSortDropdown(); }}>
                  <ArrowDown size={16} />
                  <span>Revenue (High-Low)</span>
                  {sortConfig.key === 'revenue' && sortConfig.direction === 'desc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'revenue' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('revenue'); closeSortDropdown(); }}>
                  <ArrowUp size={16} />
                  <span>Revenue (Low-High)</span>
                  {sortConfig.key === 'revenue' && sortConfig.direction === 'asc' && <span className="check-icon" style={{ color: 'var(--primary)' }}>✓</span>}
                </button>
              </div>
            )}
          </div>
          <div className="dropdown-container" ref={actionsDropdownRef}>
            <button className={`btn btn-secondary ${showActionsDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); if (showActionsDropdown) { closeActionsDropdown(); } else { setShowActionsDropdown(true); setShowSortDropdown(false); } }}>
              <MoreHorizontal size={16} />
              Actions
              <ChevronDown size={14} className={showActionsDropdown ? 'rotate' : ''} />
            </button>
            {showActionsDropdown && (
              <div className={`premium-dropdown actions-dropdown ${actionsDropdownClosing ? 'closing' : ''}`}>
                <div className="dropdown-header">Actions</div>
                <button className="dropdown-item" onClick={() => { handleExport(); closeActionsDropdown(); }}>
                  <Download size={16} />
                  <span>Export Data</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Generating PDF...'); closeActionsDropdown(); }}>
                  <Eye size={16} />
                  <span>Generate PDF</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Sending report via email...'); closeActionsDropdown(); }}>
                  <MessageCircle size={16} />
                  <span>Email Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
              </div>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">All</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
              {columns.map(col => (
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
                    <button 
                      className="action-btn" 
                      ref={(el) => (actionMenuRefs.current[row.id] = el)}
                      onClick={() => {
                        if (actionMenuOpen === row.id) {
                          setActionMenuOpen(null);
                        } else {
                          const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                          setActionMenuPosition(pos);
                          setActionMenuOpen(row.id);
                        }
                      }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && (
                      <div 
                        className={`action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`}
                      >
                        <button onClick={() => { alert(`Viewing details for: ${row.date}`); setActionMenuOpen(null); }}>
                          <Eye size={14} /> View Details
                        </button>
                        <button onClick={() => { alert(`Editing record: ${row.date}`); setActionMenuOpen(null); }}>
                          <Edit2 size={14} /> Edit
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>{row.date}</td>
                <td>{row.newLeads}</td>
                <td>{row.followups}</td>
                <td><span className={`badge badge-${row.conversions >= 10 ? 'hot-lead' : row.conversions >= 5 ? 'warm-lead' : 'cold-lead'}`}>{row.conversions}</span></td>
                <td>{row.calls}</td>
                <td>₹{row.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
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
    </div>
  );
};

export default LeadDailyActivity;