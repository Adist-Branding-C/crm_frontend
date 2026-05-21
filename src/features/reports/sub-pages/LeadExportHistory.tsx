import React, { useState, useRef } from 'react';
import {
  Download, RefreshCw, Filter, Search, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import '../../../pages/Enquiries.css';

interface ExportRow {
  id: number;
  dateTime: string;
  fileName: string;
  status: string;
  [key: string]: string | number;
}

const exportHistoryData: ExportRow[] = [
  { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'leads_export_25Jan2024', status: 'completed' },
  { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_export_24Jan2024', status: 'completed' },
  { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'export_jan24', status: 'completed' },
  { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'leads_backup', status: 'failed' },
  { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'jan23_export', status: 'completed' },
  { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'leads_23jan', status: 'generating' },
  { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_export', status: 'completed' },
  { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'leads_jan22', status: 'completed' },
  { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'export_file', status: 'failed' },
  { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'backup_jan20', status: 'completed' },
];

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'dateTime', label: 'Date and Time', sortable: true },
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'download', label: 'Download', sortable: false },
];

const LeadExportHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'dateTime', direction: 'desc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

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
    let data = [...exportHistoryData];
    if (searchQuery) {
      data = data.filter(item =>
        item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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
  }, [searchQuery, sortConfig]);

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

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      completed: 'badge-active',
      generating: 'badge-pending',
      failed: 'badge-inactive'
    };
    return statusClasses[status] || 'badge-inactive';
  };

  const handleDownload = (fileName: string) => {
    alert(`Downloading: ${fileName}`);
  };

  return (
    <div className="enquiries-page">
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-secondary">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="search-input" />
          </div>
        </div>
      </div>

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
                        <button onClick={() => alert(`Viewing details for: ${row.fileName}`)}>View Details</button>
                        <button onClick={() => alert(`Deleting: ${row.fileName}`)} className="delete">Delete</button>
                      </div>
                    )}
                  </div>
                </td>
                <td>{startIndex + index + 1}</td>
                <td>{row.dateTime}</td>
                <td className="lead-name-cell">{row.fileName}</td>
                <td><span className={`badge ${getStatusBadge(row.status)}`}>{row.status}</span></td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownload(row.fileName)}
                    disabled={row.status === 'generating'}
                    style={{ padding: '0.375rem 0.75rem', height: 'auto', fontSize: '0.75rem' }}
                  >
                    <Download size={14} />
                    Download
                  </button>
                </td>
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

export default LeadExportHistory;
