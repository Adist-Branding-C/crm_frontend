import React, { useState, useRef } from 'react';
import {
  Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  Users, UserCheck, UserPlus, UserMinus, MoreHorizontal
} from 'lucide-react';
import '../../../pages/Enquiries.css';

interface StatusRow {
  id: number;
  agentName: string;
  initials: string;
  total: number;
  new: number;
  connected: number;
  interested: number;
  registered: number;
  notInterested: number;
  justEnquiry: number;
  detailsShared: number;
  webinarAttended: number;
  lost: number;
  dnd: number;
  later: number;
  [key: string]: string | number;
}

const statusData: StatusRow[] = [
  { id: 1, agentName: 'John Doe', initials: 'JD', total: 156, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 22, webinarAttended: 5, lost: 8, dnd: 3, later: 4 },
  { id: 2, agentName: 'Jane Smith', initials: 'JS', total: 142, new: 18, connected: 38, interested: 28, registered: 15, notInterested: 10, justEnquiry: 6, detailsShared: 18, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
  { id: 3, agentName: 'Mike Johnson', initials: 'MJ', total: 198, new: 35, connected: 52, interested: 42, registered: 25, notInterested: 15, justEnquiry: 12, detailsShared: 28, webinarAttended: 8, lost: 12, dnd: 4, later: 5 },
  { id: 4, agentName: 'Sarah Williams', initials: 'SW', total: 124, new: 20, connected: 35, interested: 25, registered: 14, notInterested: 8, justEnquiry: 5, detailsShared: 15, webinarAttended: 3, lost: 5, dnd: 2, later: 2 },
  { id: 5, agentName: 'Rahul Sharma', initials: 'RS', total: 167, new: 28, connected: 48, interested: 35, registered: 20, notInterested: 14, justEnquiry: 9, detailsShared: 20, webinarAttended: 6, lost: 9, dnd: 3, later: 4 },
  { id: 6, agentName: 'Priya Patel', initials: 'PP', total: 145, new: 22, connected: 40, interested: 30, registered: 17, notInterested: 11, justEnquiry: 7, detailsShared: 19, webinarAttended: 4, lost: 7, dnd: 2, later: 3 },
  { id: 7, agentName: 'Amit Kumar', initials: 'AK', total: 189, new: 32, connected: 50, interested: 38, registered: 22, notInterested: 13, justEnquiry: 11, detailsShared: 25, webinarAttended: 7, lost: 11, dnd: 4, later: 4 },
  { id: 8, agentName: 'Sneha Reddy', initials: 'SR', total: 132, new: 19, connected: 36, interested: 26, registered: 15, notInterested: 9, justEnquiry: 6, detailsShared: 16, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
  { id: 9, agentName: 'Vikram Singh', initials: 'VS', total: 156, new: 24, connected: 42, interested: 31, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 18, webinarAttended: 5, lost: 8, dnd: 3, later: 3 },
  { id: 10, agentName: 'Ananya Gupta', initials: 'AG', total: 178, new: 30, connected: 48, interested: 36, registered: 21, notInterested: 13, justEnquiry: 10, detailsShared: 23, webinarAttended: 6, lost: 10, dnd: 3, later: 4 },
];

interface StatsCard {
  key: string;
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  change: string;
}

const statsCards: StatsCard[] = [
  { key: 'total', label: 'Total Leads', value: 1587, icon: Users, color: '#3b82f6', change: '+12%' },
  { key: 'interested', label: 'Interested Leads', value: 323, icon: UserCheck, color: '#10b981', change: '+8%' },
  { key: 'registered', label: 'Registered Leads', value: 185, icon: UserPlus, color: '#8b5cf6', change: '+15%' },
  { key: 'notInterested', label: 'Not Interested', value: 117, icon: UserMinus, color: '#ef4444', change: '-5%' },
];

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'agentName', label: 'Agent Name', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'new', label: 'New', sortable: true },
  { key: 'connected', label: 'Connected', sortable: true },
  { key: 'interested', label: 'Interested', sortable: true },
  { key: 'registered', label: 'Registered', sortable: true },
  { key: 'notInterested', label: 'Not Interested', sortable: true },
  { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
  { key: 'detailsShared', label: 'Details Shared', sortable: true },
  { key: 'webinarAttended', label: 'Webinar', sortable: true },
  { key: 'lost', label: 'Lost', sortable: true },
  { key: 'dnd', label: 'DND', sortable: true },
  { key: 'later', label: 'Later', sortable: true },
];

interface Filters {
  dateRange: { start: string; end: string };
  sortBy: string;
  staff: string;
  leadType: string;
  purpose: string;
  source: string;
  status?: string;
}

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

  const [filters, setFilters] = useState<Filters>({
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
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'lead_status_report.csv'; link.click();
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
                <option value="new">New</option>
                <option value="connected">Connected</option>
                <option value="interested">Interested</option>
                <option value="registered">Registered</option>
                <option value="notInterested">Not Interested</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Select Staff</label>
              <select value={filters.staff} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, staff: e.target.value })}>
                <option value="">All Staff</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Lead Type</label>
              <select value={filters.leadType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, leadType: e.target.value })}>
                <option value="">Select</option>
                <option value="hot">Hot Lead</option>
                <option value="warm">Warm Lead</option>
                <option value="cold">Cold Lead</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Purpose</label>
              <select value={filters.purpose} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, purpose: e.target.value })}>
                <option value="">Select</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
                <option value="demo">Demo</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
              <select value={filters.source} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, source: e.target.value })}>
                <option value="">Select</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary">Filter</button>
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
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
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
