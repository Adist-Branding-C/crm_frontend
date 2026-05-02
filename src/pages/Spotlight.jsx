import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, ArrowUp, ArrowDown, SortAsc, SortDesc, Check, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide, Trash, Upload, UserPlus, Users, FolderPlus, Megaphone, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import LeadDetailDrawer from '../components/LeadDetailDrawer';
import './Enquiries.css';

const sampleData = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', nextFollowUp: '2024-01-25' },
  { id: 2, name: 'Priya Patel', phone: '9876543211', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', nextFollowUp: '2024-01-26' },
  { id: 3, name: 'Amit Kumar', phone: '9876543212', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', nextFollowUp: '2024-01-24' },
  { id: 4, name: 'Sneha Reddy', phone: '9876543213', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', nextFollowUp: '2024-01-23' },
  { id: 5, name: 'Vikram Singh', phone: '9876543214', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', nextFollowUp: '2024-01-22' },
  { id: 6, name: 'Ananya Gupta', phone: '9876543215', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', nextFollowUp: '2024-01-21' },
  { id: 7, name: 'Rajesh Verma', phone: '9876543216', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', nextFollowUp: '2024-01-20' },
  { id: 8, name: 'Kavitha Nair', phone: '9876543217', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', nextFollowUp: '2024-01-19' },
  { id: 9, name: 'Arun Pillai', phone: '9876543218', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Referral', createdAt: '2024-01-07', updatedAt: '2024-01-12', nextFollowUp: '2024-01-18' },
  { id: 10, name: 'Lakshmi Menon', phone: '9876543219', assignedTo: 'Mike Johnson', purpose: 'Support', type: 'Hot Lead', status: 'Inactive', source: 'Website', createdAt: '2024-01-06', updatedAt: '2024-01-11', nextFollowUp: '2024-01-17' },
  { id: 11, name: 'Suresh Iyer', phone: '9876543220', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-05', updatedAt: '2024-01-10', nextFollowUp: '2024-01-16' },
  { id: 12, name: 'Meera Das', phone: '9876543221', assignedTo: 'John Doe', purpose: 'Demo', type: 'Warm Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-04', updatedAt: '2024-01-09', nextFollowUp: '2024-01-15' },
];

const Spotlight = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [filters, setFilters] = useState({
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
    remarks: '',
    date: ''
  });

  const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'purpose', label: 'Purpose', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'updatedAt', label: 'Updated At', sortable: true },
    { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true }
  ];

  const filteredData = useMemo(() => {
    let data = [...sampleData];

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

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDirection = (key, direction) => {
    setSortConfig({ key, direction });
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
      remarks: '',
      date: ''
    });
    setShowFilters(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Spotlight" description="High-priority leads that need immediate attention." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search spotlight..."
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
              <SortDesc size={16} />
              Sort By
              <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
            </button>
            {showSortDropdown && (
              <div className="premium-dropdown sort-dropdown">
                <div className="dropdown-header">Sort By</div>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('createdAt', 'desc'); setShowSortDropdown(false); }}
                >
                  <SortDesc size={16} />
                  <span>Newest First</span>
                  {sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('createdAt', 'asc'); setShowSortDropdown(false); }}
                >
                  <SortAsc size={16} />
                  <span>Oldest First</span>
                  {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('updatedAt', 'desc'); setShowSortDropdown(false); }}
                >
                  <SortDesc size={16} />
                  <span>Updated Date</span>
                  {sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('updatedAt', 'asc'); setShowSortDropdown(false); }}
                >
                  <SortAsc size={16} />
                  <span>Updated (Oldest)</span>
                  {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('name', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDownNarrowWide size={16} />
                  <span>Name (A-Z)</span>
                  {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSortDirection('name', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUpNarrowWide size={16} />
                  <span>Name (Z-A)</span>
                  {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
                </button>
              </div>
            )}
          </div>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowActionsDropdown(!showActionsDropdown)}>
              <MoreHorizontal size={16} />
              Actions
              <ChevronDown size={14} className={showActionsDropdown ? 'rotate' : ''} />
            </button>
            {showActionsDropdown && (
              <div className="premium-dropdown actions-dropdown">
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <Upload size={16} />
                  <span>Bulk Update</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <Edit2 size={16} />
                  <span>Update Status</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <UserPlus size={16} />
                  <span>Assign Agent</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <Users size={16} />
                  <span>Bulk Assign</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <FolderPlus size={16} />
                  <span>Import Contacts</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <Megaphone size={16} />
                  <span>Add to Campaign</span>
                </button>
                <button className="dropdown-item" onClick={() => setShowActionsDropdown(false)}>
                  <Phone size={16} />
                  <span>Create Call Task</span>
                </button>
                <button className="dropdown-item danger" onClick={() => setShowActionsDropdown(false)}>
                  <Trash size={16} />
                  <span>Delete</span>
                </button>
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
                    <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && (
                      <div className="action-dropdown">
                        <button><Eye size={14} /> View</button>
                        <button><Edit2 size={14} /> Edit</button>
                        <button className="delete"><Trash2 size={14} /> Delete</button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => setSelectedLead(row)}>{row.name}</td>
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
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </PageContainer>
  );
};

export default Spotlight;