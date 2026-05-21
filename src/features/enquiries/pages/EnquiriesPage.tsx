import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Download, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide, SortAsc, SortDesc, Users, Send, Copy, RotateCcw, Check, Eye } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import { SAMPLE_LEADS, INITIAL_FILTERS, COLUMNS } from '../constants';
import type { Lead, Filters, SortConfig } from '../types';
import '../../../pages/Enquiries.css';

const EnquiriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
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

  const filteredData = useMemo(() => {
    let data = [...SAMPLE_LEADS];

    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.enquirySource) {
      data = data.filter(item => item.source === filters.enquirySource);
    }
    if (filters.enquiryPurpose) {
      data = data.filter(item => item.purpose === filters.enquiryPurpose);
    }
    if (filters.leadStatus) {
      data = data.filter(item => item.status === filters.leadStatus);
    }
    if (filters.assignedTo) {
      data = data.filter(item => item.assignedTo === filters.assignedTo);
    }
    if (filters.leadType) {
      data = data.filter(item => item.type === filters.leadType);
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof Lead];
        const bVal = b[sortConfig.key as keyof Lead];
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

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDesc = (key: string) => {
    setSortConfig({ key, direction: 'desc' });
  };

  const handleSortAsc = (key: string) => {
    setSortConfig({ key, direction: 'asc' });
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
      <PageHeader title="Leads" description="Potential customers showing interest in a product or service." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search enquiries..."
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
              <SortAsc size={16} />
              Sort By
              <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
            </button>
            {showSortDropdown && (
              <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
                <div className="dropdown-header">Sort By</div>
                <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('createdAt'); closeSortDropdown(); }}>
                  <SortDesc size={16} />
                  <span>Newest First</span>
                  {sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('createdAt'); closeSortDropdown(); }}>
                  <SortAsc size={16} />
                  <span>Oldest First</span>
                  {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('updatedAt'); closeSortDropdown(); }}>
                  <RefreshCw size={16} />
                  <span>Updated Date</span>
                  {sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('updatedAt'); closeSortDropdown(); }}>
                  <SortAsc size={16} />
                  <span>Updated (Oldest)</span>
                  {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('name'); closeSortDropdown(); }}>
                  <ArrowDownNarrowWide size={16} />
                  <span>Name (A-Z)</span>
                  {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('name'); closeSortDropdown(); }}>
                  <ArrowUpNarrowWide size={16} />
                  <span>Name (Z-A)</span>
                  {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
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
                <button className="dropdown-item" onClick={() => { alert('Exporting selected leads...'); closeActionsDropdown(); }}>
                  <Download size={16} />
                  <span>Export Selected</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Changing status...'); closeActionsDropdown(); }}>
                  <RotateCcw size={16} />
                  <span>Change Status</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Assigning staff...'); closeActionsDropdown(); }}>
                  <Users size={16} />
                  <span>Assign Staff</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Sending follow up...'); closeActionsDropdown(); }}>
                  <Send size={16} />
                  <span>Send Follow Up</span>
                </button>
                <button className="dropdown-item" onClick={() => { alert('Duplicating lead...'); closeActionsDropdown(); }}>
                  <Copy size={16} />
                  <span>Duplicate Lead</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item danger" onClick={() => { alert('Deleting selected leads...'); closeActionsDropdown(); }}>
                  <Trash2 size={16} />
                  <span>Delete Selected</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
            <Plus size={16} />
            Add Lead
          </button>
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
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
              </div>
            </div>
            <div className="filter-group">
              <label>Filter by Date</label>
              <select value={filters.filterByDate} onChange={(e) => setFilters({ ...filters, filterByDate: e.target.value })}>
                <option value="">Select</option>
                <option value="created">Created Date</option>
                <option value="updated">Updated Date</option>
                <option value="followup">Next Follow Up</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Enquiry Source</label>
              <select value={filters.enquirySource} onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })}>
                <option value="">Select</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Enquiry Purpose</label>
              <select value={filters.enquiryPurpose} onChange={(e) => setFilters({ ...filters, enquiryPurpose: e.target.value })}>
                <option value="">Select</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Demo">Demo</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Lead Status</label>
              <select value={filters.leadStatus} onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}>
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Followup Added</label>
              <select value={filters.followupAdded} onChange={(e) => setFilters({ ...filters, followupAdded: e.target.value })}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Created By</label>
              <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                <option value="">Select</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">Select</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Lead Type</label>
              <select value={filters.leadType} onChange={(e) => setFilters({ ...filters, leadType: e.target.value })}>
                <option value="">Select</option>
                <option value="Hot Lead">Hot Lead</option>
                <option value="Warm Lead">Warm Lead</option>
                <option value="Cold Lead">Cold Lead</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Date</label>
              <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Remarks</label>
              <input type="text" placeholder="Enter remarks" value={filters.remarks} onChange={(e) => setFilters({ ...filters, remarks: e.target.value })} />
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
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        if (actionMenuOpen === row.id) {
                          setActionMenuOpen(null);
                        } else {
                          setActionMenuOpen(row.id);
                          setActionMenuButtonRect(rect);
                        }
                      }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && actionMenuButtonRect && (
                      <ActionDropdownPortal
                        isOpen={actionMenuOpen === row.id}
                        buttonRect={actionMenuButtonRect}
                        onClose={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }}
                      >
                        <button onClick={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }}>
                          <Edit2 size={14} /> Edit
                        </button>
                        <button onClick={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }} className="delete">
                          <Trash2 size={14} /> Delete
                        </button>
                        <button onClick={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }} className="whatsapp">
                          <Eye size={14} /> View Details
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
      <AddLeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </PageContainer>
  );
};

export default EnquiriesPage;
