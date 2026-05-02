import React, { useState } from 'react';
import { 
  RefreshCw, Search, ChevronDown, ChevronLeft, ChevronRight,
  Eye, Plus, X, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Enquiries.css';

const importHistoryData = [
  { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'contacts_import_25Jan', total: 500, duplicate: 12, invalid: 5, imported: 483, status: 'completed' },
  { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_import_24Jan', total: 250, duplicate: 8, invalid: 2, imported: 240, status: 'completed' },
  { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'bulk_contacts', total: 1000, duplicate: 45, invalid: 20, imported: 935, status: 'completed' },
  { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'jan24_import', total: 150, duplicate: 3, invalid: 1, imported: 146, status: 'failed' },
  { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'contacts_jan23', total: 300, duplicate: 15, invalid: 8, imported: 277, status: 'completed' },
  { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'new_leads_import', total: 75, duplicate: 2, invalid: 0, imported: 73, status: 'generating' },
  { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_import', total: 450, duplicate: 20, invalid: 10, imported: 420, status: 'completed' },
  { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'contacts_backup', total: 600, duplicate: 30, invalid: 15, imported: 555, status: 'completed' },
  { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'jan21_import', total: 200, duplicate: 5, invalid: 3, imported: 192, status: 'failed' },
  { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'contact_list', total: 350, duplicate: 18, invalid: 7, imported: 325, status: 'completed' },
];

const columns = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'dateTime', label: 'Date and Time', sortable: true },
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'total', label: 'Total Records', sortable: true },
  { key: 'duplicate', label: 'Duplicate Records', sortable: true },
  { key: 'invalid', label: 'Invalid Records', sortable: true },
  { key: 'imported', label: 'Imported Records', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

const ImportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Contacts</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="upload-section">
            <label>Upload File</label>
            <div className="file-input-wrapper">
              <input type="file" accept=".csv,.xlsx,.xls" />
              <button className="btn-link">Download Sample File</button>
            </div>
          </div>
          
          <div className="required-fields">
            <p><strong>* Required Fields:</strong></p>
            <p>Country Code, Mobile Number, Lead Source</p>
            <p>All other fields can be left empty if the information is not available.</p>
          </div>
          
          <div className="example-section">
            <p>Example:</p>
            <pre className="example-code">
Name,Country Code,Mobile Number,Lead Source,Email
ABC,+1,1234567890,Website,
,+91,9876543210,Referral,,john@example.com
            </pre>
          </div>
          
          <div className="format-note">
            <p>Please ensure the date is formatted as either yyyy-mm-dd or dd-mm-yyyy.</p>
            <p>Examples: 2021-12-31 or 31-12-2021. Dates are used to track when the lead was generated or updated.</p>
            <p>Note: Any duplicate phone number rows in the file will be skipped automatically.</p>
          </div>
          
          <div className="modal-actions">
            <button className="btn btn-primary">Upload</button>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadImportHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'dateTime', direction: 'desc' });
  const [showModal, setShowModal] = useState(false);

  const filteredData = React.useMemo(() => {
    let data = [...importHistoryData];
    if (searchQuery) {
      data = data.filter(item => 
        item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
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

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) { setSelectedRows(paginatedData.map(item => item.id)); }
    else { setSelectedRows([]); }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'badge-active',
      generating: 'badge-pending',
      failed: 'badge-inactive'
    };
    return statusClasses[status] || 'badge-inactive';
  };

  const handleView = (id) => {
    navigate(`/reports/lead/import-history/${id}`);
  };

  const handleImportClick = () => {
    setShowModal(true);
  };

  return (
    <div className="enquiries-page">
      <ImportModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-primary" onClick={handleImportClick}>
            <Plus size={16} />
            Import Contact
          </button>
          <button className="btn btn-secondary">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
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
                  <button 
                    className="action-btn" 
                    onClick={() => handleView(row.id)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </td>
                <td>{startIndex + index + 1}</td>
                <td>{row.dateTime}</td>
                <td className="lead-name-cell">{row.fileName}</td>
                <td>{row.total}</td>
                <td>{row.duplicate}</td>
                <td>{row.invalid}</td>
                <td><strong>{row.imported}</strong></td>
                <td><span className={`badge ${getStatusBadge(row.status)}`}>{row.status}</span></td>
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

export default LeadImportHistory;