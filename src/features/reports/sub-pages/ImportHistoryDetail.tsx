import React, { useState } from 'react';
import {
  RefreshCw, Search, ChevronDown, ChevronLeft, ChevronRight, Eye,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../pages/Enquiries.css';

interface DetailRow {
  id: number;
  name: string;
  phone: string;
  email?: string;
  reason?: string;
  createdAt: string;
  meta: string;
  [key: string]: string | number | undefined;
}

const importedData: DetailRow[] = [
  { id: 1, name: 'John Doe', phone: '+1 1234567890', email: 'john@example.com', reason: '', createdAt: '2024-01-25', meta: 'Source: Website' },
  { id: 2, name: 'Jane Smith', phone: '+91 9876543210', email: 'jane@test.com', reason: '', createdAt: '2024-01-25', meta: 'Source: Referral' },
  { id: 3, name: 'Mike Johnson', phone: '+1 5551234567', email: 'mike@company.com', reason: '', createdAt: '2024-01-24', meta: 'Source: Website' },
  { id: 4, name: 'Sarah Williams', phone: '+91 9988776655', email: 'sarah@example.com', reason: '', createdAt: '2024-01-24', meta: 'Source: Facebook' },
  { id: 5, name: 'Rahul Sharma', phone: '+91 9876543211', email: 'rahul@test.com', reason: '', createdAt: '2024-01-23', meta: 'Source: Website' },
];

const duplicateData: DetailRow[] = [
  { id: 1, name: 'Duplicate User', phone: '+1 1234567890', email: 'dup1@example.com', reason: 'Duplicate Phone Number', createdAt: '2024-01-25', meta: 'Source: Website' },
  { id: 2, name: 'Existing Contact', phone: '+91 9876543210', email: 'existing@test.com', reason: 'Phone already exists', createdAt: '2024-01-25', meta: 'Source: Referral' },
];

const failedData: DetailRow[] = [
  { id: 1, name: 'Invalid User', phone: '+1 0000000000', email: 'invalid@test.com', reason: 'Invalid Phone Number', createdAt: '2024-01-24', meta: 'Source: Website' },
  { id: 2, name: 'No Email', phone: '+91 1234567890', email: '', reason: 'Missing required field', createdAt: '2024-01-24', meta: 'Source: Facebook' },
  { id: 3, name: 'Bad Email', phone: '+91 5555555555', email: 'not-an-email', reason: 'Invalid email format', createdAt: '2024-01-23', meta: 'Source: Website' },
];

const statsData = {
  total: 500,
  imported: 483,
  duplicates: 12,
  failed: 5
};

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone Number', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'reason', label: 'Reason', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'meta', label: 'Meta Data', sortable: true },
];

const ImportHistoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('imported');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

  const getTableData = (): DetailRow[] => {
    switch (activeTab) {
      case 'imported': return importedData;
      case 'duplicates': return duplicateData;
      case 'failed': return failedData;
      default: return importedData;
    }
  };

  const filteredData = React.useMemo(() => {
    let data = getTableData();
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [activeTab, searchQuery, sortConfig]);

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

  return (
    <div className="enquiries-page">
      <div className="report-page-header-simple">
        <h1 className="header-title-simple">contacts_import_25Jan.csv</h1>
      </div>

      <div className="stats-card-row">
        <div className="stat-card">
          <span className="stat-number">{statsData.total}</span>
          <span className="stat-label">Total Records</span>
        </div>
        <div className="stat-card stat-card-success">
          <CheckCircle size={24} className="stat-icon" />
          <span className="stat-number">{statsData.imported}</span>
          <span className="stat-label">Imported</span>
        </div>
        <div className="stat-card stat-card-warning">
          <AlertCircle size={24} className="stat-icon" />
          <span className="stat-number">{statsData.duplicates}</span>
          <span className="stat-label">Duplicates</span>
        </div>
        <div className="stat-card stat-card-danger">
          <XCircle size={24} className="stat-icon" />
          <span className="stat-number">{statsData.failed}</span>
          <span className="stat-label">Failed</span>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'imported' ? 'active' : ''}`}
          onClick={() => setActiveTab('imported')}
        >
          Imported ({statsData.imported})
        </button>
        <button
          className={`tab-btn ${activeTab === 'duplicates' ? 'active' : ''}`}
          onClick={() => setActiveTab('duplicates')}
        >
          Duplicates ({statsData.duplicates})
        </button>
        <button
          className={`tab-btn ${activeTab === 'failed' ? 'active' : ''}`}
          onClick={() => setActiveTab('failed')}
        >
          Failed ({statsData.failed})
        </button>
      </div>

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
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
                <td>{startIndex + index + 1}</td>
                <td className="lead-name-cell">{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.email || '-'}</td>
                <td>{row.reason || '-'}</td>
                <td>{row.createdAt}</td>
                <td className="meta-cell">{row.meta}</td>
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

export default ImportHistoryDetail;
