import React, { useState, useRef } from 'react';
import {
  Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../../pages/Enquiries.css';

interface StatusChangeRow {
  id: number;
  agentName: string;
  total: number;
  [key: string]: string | number;
}

const statusChangeData: StatusChangeRow[] = [
  { id: 1, agentName: 'John Doe', total: 45 },
  { id: 2, agentName: 'Jane Smith', total: 38 },
  { id: 3, agentName: 'Mike Johnson', total: 52 },
  { id: 4, agentName: 'Sarah Williams', total: 28 },
  { id: 5, agentName: 'Rahul Sharma', total: 35 },
  { id: 6, agentName: 'Priya Patel', total: 22 },
  { id: 7, agentName: 'Amit Kumar', total: 41 },
  { id: 8, agentName: 'Sneha Reddy', total: 18 },
  { id: 9, agentName: 'Vikram Singh', total: 29 },
];

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'new', label: 'New' },
  { value: 'connected', label: 'Connected' },
  { value: 'interested', label: 'Interested' },
  { value: 'registered', label: 'Registered' },
  { value: 'notInterested', label: 'Not Interested' },
  { value: 'justEnquiry', label: 'Just Enquiry - try after few days' },
  { value: 'detailsShared', label: 'Details Shared' },
  { value: 'webinar', label: 'Webinar Attended' },
  { value: 'junkLead', label: 'Junk Lead' },
  { value: 'dnd', label: 'DND - NA/ Off/ Invalid' },
  { value: 'later', label: 'Later Admission' },
];

const staffOptions: Option[] = [
  { value: '', label: 'Select Staff' },
  { value: 'all', label: 'All' },
  { value: '7774', label: 'Dr Expert Edulinks' },
  { value: '7775', label: 'Fida Fathima' },
  { value: '7776', label: 'Nandana K' },
  { value: '7777', label: 'Rameesa' },
  { value: '7778', label: 'Aysha' },
  { value: '7779', label: 'Nesri' },
  { value: '7789', label: 'Dilshana' },
  { value: '8473', label: 'Rahmath' },
  { value: '8640', label: 'Lana' },
];

const sourceOptions: Option[] = [
  { value: '', label: 'Select Enquiry Source' },
  { value: 'empty', label: 'Empty Source' },
  { value: '21143', label: 'Incoming Call / whatsapp' },
  { value: '21144', label: 'Meta Campaign' },
  { value: '21153', label: 'From Doctor' },
  { value: '21714', label: 'Website' },
  { value: '21767', label: 'Meta' },
  { value: '24424', label: 'Uzbekistan | Common | Kerala' },
  { value: '24425', label: 'Uzbekistan | Common | GCC' },
];

const totalLeads = statusChangeData.reduce((sum, item) => sum + item.total, 0);

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
];

interface Filters {
  dateRange: { start: string; end: string };
  status: string | string[];
  agentId: string;
  leadSource: string;
}

const LeadStatusChange: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'agentName', direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const [filters, setFiltersState] = useState<Filters>({
    dateRange: { start: '', end: '' },
    status: [],
    agentId: '',
    leadSource: ''
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
    let data = [...statusChangeData];
    if (searchQuery) {
      data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filters.agentId) { data = data.filter(item => item.agentName === filters.agentId); }
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
    setFiltersState({ dateRange: { start: '', end: '' }, status: [], agentId: '', leadSource: '' });
    setShowFilters(false);
  };

  const handleExport = () => {
    const headers = ['Agent Name', 'Total'];
    const csvContent = [headers.join(','), ...statusChangeData.map(d => [d.agentName, d.total].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'status_change_report.csv'; link.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Report generated successfully!');
  };

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
                <label>Date</label>
                <div className="date-range-input">
                  <input type="date" value={filters.dateRange.start} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                  <span>to</span>
                  <input type="date" value={filters.dateRange.end} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
                </div>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select value={filters.status as string} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, status: e.target.value })}>
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Staff</label>
                <select value={filters.agentId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, agentId: e.target.value })}>
                  {staffOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Enquiry Source</label>
                <select value={filters.leadSource} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, leadSource: e.target.value })}>
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
                        <button onClick={() => alert(`Viewing details for: ${row.agentName}`)}>View Details</button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell">{row.agentName}</td>
                <td><strong>{row.total}</strong></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td><strong>Total</strong></td>
              <td><strong>{totalLeads}</strong></td>
            </tr>
          </tfoot>
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

export default LeadStatusChange;
