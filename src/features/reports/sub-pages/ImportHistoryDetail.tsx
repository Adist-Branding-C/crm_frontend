import React, { useEffect, useState } from 'react';
import {
  RefreshCw, ChevronLeft, ChevronRight,
  CheckCircle, XCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import './ReportsSubPages.css';
import { importDetailColumns as columns } from '../constants/historyReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import { useImportHistoryDetail } from '../hooks/useImportHistoryDetail';
import type { ImportEntryStatus } from '../types';

type DetailTab = 'imported' | 'failed';

const TAB_TO_STATUS: Record<DetailTab, ImportEntryStatus> = {
  imported: 'success',
  failed: 'failed',
};

const ImportHistoryDetail: React.FC = () => {
  const { id: importId } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<DetailTab>('imported');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { importHistory, entries, total, totalPages, isLoading, fetchDetail, fetchEntries } = useImportHistoryDetail();

  useEffect(() => {
    if (!importId) return;
    fetchDetail(importId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importId]);

  useEffect(() => {
    if (!importId) return;
    fetchEntries(importId, TAB_TO_STATUS[activeTab], currentPage, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importId, activeTab, currentPage, rowsPerPage]);

  // Same reasoning as the list page: the worker finishes async, so poll
  // while this import is still pending/processing instead of leaving the
  // stats/tabs stuck showing 0 until someone clicks Refresh.
  useEffect(() => {
    if (!importId || !importHistory) return;
    if (importHistory.status !== 'pending' && importHistory.status !== 'processing') return;
    const timer = setTimeout(() => {
      fetchDetail(importId);
      fetchEntries(importId, TAB_TO_STATUS[activeTab], currentPage, rowsPerPage);
    }, 2000);
    return () => clearTimeout(timer);
  }, [importId, importHistory, activeTab, currentPage, rowsPerPage, fetchDetail, fetchEntries]);

  const handleTabChange = (tab: DetailTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    if (!importId) return;
    fetchDetail(importId);
    fetchEntries(importId, TAB_TO_STATUS[activeTab], currentPage, rowsPerPage);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <div className="enquiries-page">
      <div className="report-page-header-simple">
        <h1 className="header-title-simple">{importHistory?.fileName ?? 'Import details'}</h1>
      </div>

      <div className="stats-card-row">
        <div className="stat-card">
          <span className="stat-number">{importHistory?.totalRows ?? 0}</span>
          <span className="stat-label">Total Records</span>
        </div>
        <div className="stat-card stat-card-success">
          <CheckCircle size={24} className="stat-icon" />
          <span className="stat-number">{importHistory?.successCount ?? 0}</span>
          <span className="stat-label">Imported</span>
        </div>
        <div className="stat-card stat-card-danger">
          <XCircle size={24} className="stat-icon" />
          <span className="stat-number">{importHistory?.failedCount ?? 0}</span>
          <span className="stat-label">Failed</span>
        </div>
      </div>

      <div className="tabs-container">
        <button className={`tab-btn ${activeTab === 'imported' ? 'active' : ''}`} onClick={() => handleTabChange('imported')}>
          Imported ({importHistory?.successCount ?? 0})
        </button>
        <button className={`tab-btn ${activeTab === 'failed' ? 'active' : ''}`} onClick={() => handleTabChange('failed')}>
          Failed ({importHistory?.failedCount ?? 0})
        </button>
      </div>

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.key === 'checkbox' ? null : col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>Loading…</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>No records</td></tr>
            ) : entries.map((row, index) => (
              <tr key={row.id}>
                <td></td>
                <td>{startIndex + index + 1}</td>
                <td className="lead-name-cell">{row.name ?? '-'}</td>
                <td>{row.phone ?? '-'}</td>
                <td>{row.source ?? '-'}</td>
                <td>{row.purpose ?? '-'}</td>
                <td>{row.assignedTo ?? '-'}</td>
                <td>{row.errorMessage ?? '-'}</td>
                <td>{new Date(row.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {total === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, total)} of {total}</span>
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
