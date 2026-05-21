import React, { useState, useRef } from 'react';
import {
  Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import '../../../pages/Enquiries.css';

interface CheckoutRow {
  id: number;
  shop: string;
  agent: string;
  note: string;
  date: string;
  [key: string]: string | number;
}

const checkoutData: CheckoutRow[] = [
  { id: 1, shop: 'Shop A', agent: 'John Doe', note: 'Checkout completed', date: '2024-01-25' },
  { id: 2, shop: 'Shop B', agent: 'Jane Smith', note: 'All tasks finished', date: '2024-01-25' },
  { id: 3, shop: 'Shop A', agent: 'Mike Johnson', note: 'Pending work tomorrow', date: '2024-01-24' },
  { id: 4, shop: 'Shop C', agent: 'Sarah Williams', note: 'Early checkout', date: '2024-01-24' },
  { id: 5, shop: 'Shop B', agent: 'John Doe', note: 'Completed', date: '2024-01-23' },
  { id: 6, shop: 'Shop A', agent: 'Priya Patel', note: 'Done', date: '2024-01-23' },
  { id: 7, shop: 'Shop C', agent: 'Amit Kumar', note: 'Work in progress', date: '2024-01-22' },
  { id: 8, shop: 'Shop B', agent: 'Sneha Reddy', note: 'Finished', date: '2024-01-22' },
  { id: 9, shop: 'Shop A', agent: 'Vikram Singh', note: 'All done', date: '2024-01-21' },
  { id: 10, shop: 'Shop C', agent: 'Ananya Gupta', note: 'Checkout', date: '2024-01-21' },
];

interface Option {
  value: string;
  label: string;
}

const staffOptions: Option[] = [
  { value: '', label: 'Select Staff' },
  { value: 'all', label: 'All Staff' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
  { value: 'sarah', label: 'Sarah Williams' },
];

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'shop', label: 'Shop', sortable: true },
  { key: 'agent', label: 'Agent', sortable: true },
  { key: 'note', label: 'Note', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
];

interface Filters {
  fromDate: string;
  toDate: string;
  staffId: string;
}

const LeadCheckoutSummary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const [filters, setFiltersState] = useState<Filters>({
    fromDate: '',
    toDate: '',
    staffId: ''
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
    let data = [...checkoutData];
    if (searchQuery) {
      data = data.filter(item =>
        item.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.staffId) { data = data.filter(item => item.agent === filters.staffId); }
    if (filters.fromDate) { data = data.filter(item => item.date >= filters.fromDate); }
    if (filters.toDate) { data = data.filter(item => item.date <= filters.toDate); }
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
    setFiltersState({ fromDate: '', toDate: '', staffId: '' });
    setShowFilters(false);
  };

  const handleExport = () => {
    const headers = ['Shop', 'Agent', 'Note', 'Date'];
    const csvContent = [headers.join(','), ...checkoutData.map(d => [d.shop, d.agent, d.note, d.date].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'checkout_summary.csv'; link.click();
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
                <label>From Date</label>
                <input type="date" value={filters.fromDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, fromDate: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>To Date</label>
                <input type="date" value={filters.toDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltersState({ ...filters, toDate: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>Select Staff</label>
                <select value={filters.staffId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFiltersState({ ...filters, staffId: e.target.value })}>
                  {staffOptions.map(opt => (
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
                        <button onClick={() => alert(`Viewing details for: ${row.agent}`)}>View Details</button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell">{row.shop}</td>
                <td>{row.agent}</td>
                <td>{row.note}</td>
                <td>{row.date}</td>
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

export default LeadCheckoutSummary;
