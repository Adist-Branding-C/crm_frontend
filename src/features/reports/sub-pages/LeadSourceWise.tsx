import React, { useState, useRef } from 'react';
import {
  Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import '../../../pages/Enquiries.css';

interface SourceRow {
  id: number;
  source: string;
  fromDate: string;
  toDate: string;
  none: number;
  new: number;
  connected: number;
  interested: number;
  registered: number;
  notInterested: number;
  justEnquiry: number;
  plusOne: number;
  detailsShared: number;
  plusTwoCall: number;
  neetAfter: number;
  seminarInt: number;
  nursingPg: number;
  fridayWeb: number;
  plusTwo2027: number;
  mbbs: number;
  webinarGform: number;
  webinarAtt: number;
  junkForm: number;
  junkHindi: number;
  webinarFollow: number;
  webinarLost: number;
  dnd: number;
  later: number;
  empty: number;
  total: number;
  [key: string]: string | number;
}

const sourceWiseData: SourceRow[] = [
  { id: 1, source: 'Website', fromDate: '2024-01-01', toDate: '2024-01-31', none: 5, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, plusOne: 6, detailsShared: 22, plusTwoCall: 4, neetAfter: 3, seminarInt: 5, nursingPg: 2, fridayWeb: 3, plusTwo2027: 4, mbbs: 5, webinarGform: 6, webinarAtt: 8, junkForm: 4, junkHindi: 2, webinarFollow: 3, webinarLost: 2, dnd: 3, later: 4, empty: 5, total: 208 },
];

interface Option {
  value: string;
  label: string;
}

const sortOptions: Option[] = [
  { value: '', label: 'All' },
  { value: 'assignedDate', label: 'Assigned Date' },
  { value: 'createdDate', label: 'Created Date' },
];

const agentOptions: Option[] = [
  { value: '', label: 'Select Agent' },
  { value: 'all', label: 'All Agents' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

const sourceOptions: Option[] = [
  { value: '', label: 'Select Source' },
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Website' },
  { value: 'meta', label: 'Meta Campaign' },
  { value: 'referral', label: 'Referral' },
  { value: 'whatsapp', label: 'Incoming Call / WhatsApp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google Ads' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'seminar', label: 'Seminar' },
];

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'select', label: 'Select' },
  { key: 'action', label: 'Action' },
  { key: 'slNo', label: 'SL No' },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'fromDate', label: 'From Date', sortable: true },
  { key: 'toDate', label: 'To Date', sortable: true },
  { key: 'none', label: 'None', sortable: true },
  { key: 'new', label: 'New', sortable: true },
  { key: 'connected', label: 'Connected', sortable: true },
  { key: 'interested', label: 'Interested', sortable: true },
  { key: 'registered', label: 'Registered', sortable: true },
  { key: 'notInterested', label: 'Not Interested', sortable: true },
  { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
  { key: 'plusOne', label: 'Plus One', sortable: true },
  { key: 'detailsShared', label: 'Details Shared', sortable: true },
  { key: 'plusTwoCall', label: 'Plus Two Call', sortable: true },
  { key: 'neetAfter', label: 'NEET After', sortable: true },
  { key: 'seminarInt', label: 'Seminar Int', sortable: true },
  { key: 'nursingPg', label: 'Nursing PG', sortable: true },
  { key: 'fridayWeb', label: 'Friday Web', sortable: true },
  { key: 'plusTwo2027', label: 'Plus Two 2027', sortable: true },
  { key: 'mbbs', label: 'MBBS Doing', sortable: true },
  { key: 'webinarGform', label: 'Web GForm', sortable: true },
  { key: 'webinarAtt', label: 'Web Attended', sortable: true },
  { key: 'junkForm', label: 'Junk Form', sortable: true },
  { key: 'junkHindi', label: 'Junk Hindi', sortable: true },
  { key: 'webinarFollow', label: 'Web Follow', sortable: true },
  { key: 'webinarLost', label: 'Web Lost', sortable: true },
  { key: 'dnd', label: 'DND', sortable: true },
  { key: 'later', label: 'Later', sortable: true },
  { key: 'empty', label: 'Empty Status', sortable: true },
  { key: 'total', label: 'Total Leads', sortable: true },
];

interface Filters {
  dateRange: { start: string; end: string };
  sortBy: string;
  agentId: string;
  selectSource: string;
}

const LeadSourceWise: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'source', direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const [filters, setFiltersState] = useState<Filters>({
    dateRange: { start: '', end: '' },
    sortBy: '',
    agentId: '',
    selectSource: ''
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
    let data = [...sourceWiseData];
    if (searchQuery) {
      data = data.filter(item => item.source.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filters.agentId) { data = data.filter(item => item.agentId === filters.agentId); }
    if (filters.selectSource) { data = data.filter(item => item.source === filters.selectSource); }
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
    setFiltersState({ dateRange: { start: '', end: '' }, sortBy: '', agentId: '', selectSource: '' });
    setShowFilters(false);
  };

  const handleExport = () => {
    const headers = columns.map(c => c.label);
    const csvContent = [headers.join(','), ...sourceWiseData.map((d, idx) => [
      d.source, d.fromDate, d.toDate, d.none, d.new, d.connected, d.interested, d.registered, d.notInterested, d.justEnquiry, d.plusOne, d.detailsShared, d.plusTwoCall, d.neetAfter, d.seminarInt, d.nursingPg, d.fridayWeb, d.plusTwo2027, d.mbbs, d.webinarGform, d.webinarAtt, d.junkForm, d.junkHindi, d.webinarFollow, d.webinarLost, d.dnd, d.later, d.empty, d.total
    ].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'source_wise_report.csv'; link.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Report generated successfully!');
  };

  const grandTotal = sourceWiseData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="enquiries-page">
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
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="search-input" />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <form id="getReport" onSubmit={handleSubmit}>
            <div className="filter-row">
              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-range-input">
                  <input type="date" value={filters.dateRange.start} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                  <span>to</span>
                  <input type="date" value={filters.dateRange.end} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
                </div>
              </div>
              <div className="filter-group">
                <label>Sort By</label>
                <select value={filters.sortBy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, sortBy: e.target.value })}>
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Agent</label>
                <select value={filters.agentId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, agentId: e.target.value })}>
                  {agentOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Select Source</label>
                <select value={filters.selectSource} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, selectSource: e.target.value })}>
                  {sourceOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-actions">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <div className="table-scroll-container">
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
                      <button className="action-btn" ref={(el) => { actionMenuRefs.current[row.id] = el as HTMLButtonElement | null; }} onClick={() => { if (actionMenuOpen === row.id) { setActionMenuOpen(null); } else { const pos = calculateDropdownPosition(actionMenuRefs.current[row.id] as HTMLButtonElement | null); setActionMenuPosition(pos); setActionMenuOpen(row.id); } }}>
                        <MoreHorizontal size={16} />
                      </button>
                      {actionMenuOpen === row.id && (
                        <div className={`action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`}>
                          <button onClick={() => alert(`Viewing details for: ${row.source}`)}>View Details</button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{index + 1}</td>
                  <td className="lead-name-cell">{row.source}</td>
                  <td>{row.fromDate}</td>
                  <td>{row.toDate}</td>
                  <td>{row.none}</td>
                  <td>{row.new}</td>
                  <td>{row.connected}</td>
                  <td><span className="badge badge-active">{row.interested}</span></td>
                  <td><span className="badge badge-pending">{row.registered}</span></td>
                  <td><span className="badge badge-inactive">{row.notInterested}</span></td>
                  <td>{row.justEnquiry}</td>
                  <td>{row.plusOne}</td>
                  <td>{row.detailsShared}</td>
                  <td>{row.plusTwoCall}</td>
                  <td>{row.neetAfter}</td>
                  <td>{row.seminarInt}</td>
                  <td>{row.nursingPg}</td>
                  <td>{row.fridayWeb}</td>
                  <td>{row.plusTwo2027}</td>
                  <td>{row.mbbs}</td>
                  <td>{row.webinarGform}</td>
                  <td>{row.webinarAtt}</td>
                  <td>{row.junkForm}</td>
                  <td>{row.junkHindi}</td>
                  <td>{row.webinarFollow}</td>
                  <td>{row.webinarLost}</td>
                  <td>{row.dnd}</td>
                  <td>{row.later}</td>
                  <td>{row.empty}</td>
                  <td><strong>{row.total}</strong></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}></td>
                <td colSpan={24}><strong>Total Leads</strong></td>
                <td><strong>{grandTotal}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
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

export default LeadSourceWise;
