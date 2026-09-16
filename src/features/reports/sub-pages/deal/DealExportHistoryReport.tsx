import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Search, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { useDealExportHistory } from '../../../deal-analytics/hooks/useDealExportHistory';
import { dealAnalyticsService } from '../../../deal-analytics/services/dealAnalyticsService';
import { extractFilenameFromContentDisposition, triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import Toast from '../../../../shared/components/Toast';
import { ROWS_OPTIONS_10_25_50 } from '../../../../shared/constants/pagination';

const STATUS_BADGE_CLASSES: Record<string, string> = {
  success: 'badge-active',
  pending: 'badge-pending',
  processing: 'badge-pending',
  failed: 'badge-inactive',
};

const DealExportHistoryReport = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { items, total, isLoading, error, fetchHistory } = useDealExportHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { searchValue: searchInput, handleSearchChange } = useDebouncedSearch((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  });

  useEffect(() => {
    fetchHistory(currentPage, rowsPerPage, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;

  const handleDownload = async (exportId: string, fileName: string) => {
    if (downloadingId) return;
    setDownloadingId(exportId);
    try {
      const { data: blob, headers } = await dealAnalyticsService.downloadDealExportFile(exportId);
      const filename = extractFilenameFromContentDisposition(headers['content-disposition'], fileName);
      triggerBlobDownload(blob, filename);
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to download export.'), 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Export History" description="Track all your past deal data exports" breadcrumb={false} />

      <div className="toolbar-left" style={{ justifyContent: 'space-between', width: '100%' }}>
        <div className="toolbar-left">
          <button className="btn btn-secondary" onClick={() => navigate('/reports/deal/export')}>
            <Download size={16} /> Export
          </button>
          <button className="btn btn-secondary" onClick={() => fetchHistory(currentPage, rowsPerPage, searchQuery)}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date and Time</th>
              <th>File Name</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5}>Loading...</td></tr>
            ) : error ? (
              <tr>
                <td colSpan={5}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-text)', padding: '0.5rem 0' }}>
                    <AlertTriangle size={16} style={{ flexShrink: 0, color: 'var(--danger)' }} />
                    <span>{error}</span>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', height: 'auto', fontSize: '0.75rem' }}
                      onClick={() => fetchHistory(currentPage, rowsPerPage, searchQuery)}
                    >
                      <RefreshCw size={12} /> Try Again
                    </button>
                  </div>
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5}>No exports yet.</td></tr>
            ) : (
              items.map((row, index) => (
                <tr key={row.exportId}>
                  <td>{startIndex + index + 1}</td>
                  <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
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
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
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

export default DealExportHistoryReport;
