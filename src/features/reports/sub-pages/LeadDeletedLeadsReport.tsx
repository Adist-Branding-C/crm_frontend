import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreHorizontal, RotateCcw, Eye, ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { deletedLeadsSampleData } from '../constants';
import type { DeletedLead, SortConfig } from '../types';
import '../../../pages/Enquiries.css';

interface DeletedLeadsFilters {
  type: string;
  dateRange: { start: string; end: string };
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatus: string;
  followupAdded: string;
  createdBy: string;
  assignedTo: string;
  leadType: string;
  location: string;
  deleteReason: string;
}

const LeadDeletedLeadsReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);
  const [selectedLead, setSelectedLead] = useState<DeletedLead | null>(null);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
          }, 150);
        }
      }
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target as Node)) {
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
          }, 150);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
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

  const [filters, setFilters] = useState<DeletedLeadsFilters>({
    type: '',
    dateRange: { start: '', end: '' },
    filterByDate: '',
    enquirySource: '',
    enquiryPurpose: '',
    leadStatus: '',
    followupAdded: '',
    createdBy: '',
    assignedTo: '',
    leadType: '',
    location: '',
    deleteReason: ''
  });

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

  const filteredData = useMemo(() => {
    let data = [...deletedLeadsSampleData];
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (filters.enquirySource) data = data.filter(item => item.source === filters.enquirySource);
    if (filters.enquiryPurpose) data = data.filter(item => item.purpose === filters.enquiryPurpose);
    if (filters.leadStatus) data = data.filter(item => item.status === filters.leadStatus);
    if (filters.assignedTo) data = data.filter(item => item.assignedTo === filters.assignedTo);
    if (filters.leadType) data = data.filter(item => item.type === filters.leadType);
    if (filters.location) data = data.filter(item => item.location && item.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.deleteReason) data = data.filter(item => item.deleteReason === filters.deleteReason);
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = String(a[sortConfig.key as keyof DeletedLead] ?? '');
        const bVal = String(b[sortConfig.key as keyof DeletedLead] ?? '');
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
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDesc = (key: string) => setSortConfig({ key, direction: 'desc' });
  const handleSortAsc = (key: string) => setSortConfig({ key, direction: 'asc' });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(paginatedData.map(item => item.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev: number[]) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRecoverLead = (id: number) => {
    if (confirm('Are you sure you want to recover this lead?')) {
      console.log('Recover lead:', id);
    }
  };

  const handleRecoverAll = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one lead to recover');
      return;
    }
    if (confirm(`Are you sure you want to recover ${selectedRows.length} selected lead(s)?`)) {
      console.log('Recover leads:', selectedRows);
    }
  };

  const clearFilters = () => {
    setFilters({
      type: '', dateRange: { start: '', end: '' }, filterByDate: '', enquirySource: '', enquiryPurpose: '',
      leadStatus: '', followupAdded: '', createdBy: '', assignedTo: '', leadType: '', location: '', deleteReason: ''
    });
    setShowFilters(false);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Leads" description="View and restore previously deleted leads" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container" ref={sortDropdownRef}>
          <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); if (showSortDropdown) { closeSortDropdown(); } else { setShowSortDropdown(true); setShowActionsDropdown(false); } }}>
            <ArrowUpDown size={16} /> Sort By <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
              <div className="dropdown-header">Sort By</div>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('name'); closeSortDropdown(); }}>
                <ArrowDown size={16} /><span>Name (Z-A)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('name'); closeSortDropdown(); }}>
                <ArrowUp size={16} /><span>Name (A-Z)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('createdAt'); closeSortDropdown(); }}>
                <ArrowDown size={16} /><span>Newest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('createdAt'); closeSortDropdown(); }}>
                <ArrowUp size={16} /><span>Oldest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('deletedAt'); closeSortDropdown(); }}>
                <ArrowDown size={16} /><span>Recently Deleted</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('deletedAt'); closeSortDropdown(); }}>
                <ArrowUp size={16} /><span>Earlier Deleted</span>
              </button>
            </div>
          )}
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleRecoverAll} disabled={selectedRows.length === 0}>
            <RotateCcw size={16} /> Recover Lead ({selectedRows.length})
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group"><label>Type</label><select value={filters.leadType} onChange={(e) => setFilters({ ...filters, leadType: e.target.value })}><option value="">All</option><option value="Hot Lead">Hot Lead</option><option value="Cold Lead">Cold Lead</option><option value="Warm Lead">Warm Lead</option></select></div>
            <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
            <div className="filter-group"><label>Filter by Date</label><select value={filters.filterByDate} onChange={(e) => setFilters({ ...filters, filterByDate: e.target.value })}><option value="">Select</option><option value="created">Created Date</option><option value="deleted">Deleted Date</option></select></div>
            <div className="filter-group"><label>Source</label><select value={filters.enquirySource} onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })}><option value="">Select</option><option value="Website">Website</option><option value="Referral">Referral</option><option value="Social Media">Social Media</option><option value="Email Campaign">Email Campaign</option></select></div>
          </div>
          <div className="filter-row">
            <div className="filter-group"><label>Purpose</label><select value={filters.enquiryPurpose} onChange={(e) => setFilters({ ...filters, enquiryPurpose: e.target.value })}><option value="">All</option><option value="Sales">Sales</option><option value="Support">Support</option><option value="Demo">Demo</option></select></div>
            <div className="filter-group"><label>Status</label><select value={filters.leadStatus} onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}><option value="">All</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option></select></div>
            <div className="filter-group"><label>Delete Reason</label><select value={filters.deleteReason} onChange={(e) => setFilters({ ...filters, deleteReason: e.target.value })}><option value="">All</option><option value="Duplicate">Duplicate</option><option value="Not Interested">Not Interested</option><option value="Spam">Spam</option><option value="Invalid Number">Invalid Number</option></select></div>
            <div className="filter-group"><label>Assigned To</label><select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}><option value="">All</option><option value="John Doe">John Doe</option><option value="Jane Smith">Jane Smith</option><option value="Mike Johnson">Mike Johnson</option></select></div>
            <div className="filter-group"><label>Location</label><input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} /></div>
          </div>
          <div className="filter-row">
            <div className="filter-group"><label>Created By</label><select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}><option value="">All</option><option value="John Doe">John Doe</option><option value="Jane Smith">Jane Smith</option><option value="Mike Johnson">Mike Johnson</option></select></div>
            <div className="filter-actions"><button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button><button className="btn btn-secondary" onClick={clearFilters}>Clear</button></div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} /></th>
              <th>Action</th>
              <th onClick={() => handleSort('name')} className="sortable">Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('phone')} className="sortable">Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('location')} className="sortable">Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('assignedTo')} className="sortable">Assigned To {sortConfig.key === 'assignedTo' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('purpose')} className="sortable">Purpose {sortConfig.key === 'purpose' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('type')} className="sortable">Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('status')} className="sortable">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('source')} className="sortable">Source {sortConfig.key === 'source' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('createdAt')} className="sortable">Created At {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => handleSort('deletedAt')} className="sortable">Deleted At {sortConfig.key === 'deletedAt' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th>Delete Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (actionMenuOpen === row.id) { setActionMenuOpen(null); } else { setActionMenuOpen(row.id); setActionMenuButtonRect(rect); }
                    }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && actionMenuButtonRect && (
                      <ActionDropdownPortal isOpen={actionMenuOpen === row.id} buttonRect={actionMenuButtonRect} onClose={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }}>
                        <button onClick={() => { handleRecoverLead(row.id); setActionMenuOpen(null); setActionMenuButtonRect(null); }}>
                          <RotateCcw size={14} /> Recover
                        </button>
                      </ActionDropdownPortal>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => setSelectedLead(row)}>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td><span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span></td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>{row.source}</td>
                <td>{row.createdAt}</td>
                <td>{row.deletedAt}</td>
                <td>{row.deleteReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
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
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

export default LeadDeletedLeadsReport;
