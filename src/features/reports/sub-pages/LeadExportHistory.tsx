import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, RefreshCw, Search, ChevronLeft, ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import '../../enquiries/pages/EnquiriesPage.css';
import './ReportsSubPages.css';
import Toast from '../../../shared/components/Toast';
import { useToast } from '../../../shared/hooks/useToast';
import { useLeadExportHistory } from '../hooks/useLeadExportHistory';
import { leadExportService } from '../services/leadExportService';
import { extractFilenameFromContentDisposition, triggerBlobDownload } from '../../../shared/utils/blobDownload.util';
import { getErrorMessage } from '../../../shared/utils/error';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import { ACTION_VIEW, ACTION_DELETE } from '../../../shared/constants/actionLabels';

const HISTORY_COLUMNS = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'slNo', label: '#' },
  { key: 'dateTime', label: 'Date and Time' },
  { key: 'fileName', label: 'File Name' },
  { key: 'status', label: 'Status' },
  { key: 'download', label: 'Download' },
];

const STATUS_BADGE_CLASSES: Record<string, string> = {
  success: 'badge-active',
  pending: 'badge-pending',
  processing: 'badge-pending',
  failed: 'badge-inactive',
};

const LeadExportHistory: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { items, total, isLoading, error, fetchHistory } = useLeadExportHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    fetchHistory(currentPage, rowsPerPage, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage, searchQuery]);

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

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRows(e.target.checked ? items.map((item) => item.exportId) : []);
  };

  const handleSelectRow = (exportId: string) => {
    setSelectedRows((prev) => prev.includes(exportId) ? prev.filter((id) => id !== exportId) : [...prev, exportId]);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDownload = async (exportId: string, fileName: string) => {
    if (downloadingId) return;
    setDownloadingId(exportId);
    try {
      const { data: blob, headers } = await leadExportService.downloadExport(exportId);
      const filename = extractFilenameFromContentDisposition(headers['content-disposition'], fileName);
      triggerBlobDownload(blob, filename);
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to download export.'), 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="enquiries-page">
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-secondary" onClick={() => navigate('/reports/lead/export')}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-secondary" onClick={() => fetchHistory(currentPage, rowsPerPage, searchQuery)}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {HISTORY_COLUMNS.map((col) => (
                <th key={col.key}>
                  {col.key === 'checkbox' ? (
                    <input type="checkbox" checked={items.length > 0 && selectedRows.length === items.length} onChange={handleSelectAll} />
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={HISTORY_COLUMNS.length}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={HISTORY_COLUMNS.length}>{error}</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={HISTORY_COLUMNS.length}>No exports yet.</td></tr>
            ) : (
              items.map((row, index) => (
                <tr key={row.exportId}>
                  <td><input type="checkbox" checked={selectedRows.includes(row.exportId)} onChange={() => handleSelectRow(row.exportId)} /></td>
                  <td className="action-cell">
                    <div className="action-menu-container">
                      <button
                        className="action-btn"
                        ref={(el) => { actionMenuRefs.current[row.exportId] = el as HTMLButtonElement | null; }}
                        onClick={() => {
                          if (actionMenuOpen === row.exportId) { setActionMenuOpen(null); }
                          else {
                            const pos = calculateDropdownPosition(actionMenuRefs.current[row.exportId] as HTMLButtonElement | null);
                            setActionMenuPosition(pos);
                            setActionMenuOpen(row.exportId);
                          }
                        }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {actionMenuOpen === row.exportId && (
                        <div className={`action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`}>
                          <button onClick={() => alert(`Viewing details for: ${row.fileName}`)}>{ACTION_VIEW} Details</button>
                          <button onClick={() => alert(`Deleting: ${row.fileName}`)} className="delete">{ACTION_DELETE}</button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{startIndex + index + 1}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                  <td className="lead-name-cell">{row.fileName}</td>
                  <td><span className={`badge ${STATUS_BADGE_CLASSES[row.status] ?? 'badge-inactive'}`}>{row.status}</span></td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDownload(row.exportId, row.fileName)}
                      disabled={row.status !== 'success' || downloadingId === row.exportId}
                      style={{ padding: '0.375rem 0.75rem', height: 'auto', fontSize: '0.75rem' }}
                    >
                      <Download size={14} />
                      {downloadingId === row.exportId ? 'Downloading...' : 'Download'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {total === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, total)} of {total}</span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
      <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />
    </div>
  );
};

export default LeadExportHistory;
