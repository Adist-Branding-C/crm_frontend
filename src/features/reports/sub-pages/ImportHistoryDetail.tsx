import React, { useState, useEffect } from 'react';
import {
  RefreshCw, Search, ChevronDown, ChevronLeft, ChevronRight, Eye,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReportsSubPages.css';
import { importDetailColumns as columns } from '../constants/historyReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import { useTableData } from '../../../shared/hooks/useTableData';
import { leadImportService } from '../services/leadImportService';
import type { LeadImportEntryItem, LeadImportHistoryItem } from '../types';

const ImportHistoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'imported' | 'duplicate' | 'failed'>('imported');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [detailInfo, setDetailInfo] = useState<LeadImportHistoryItem | null>(null);

  useEffect(() => {
    if (id) {
      leadImportService.getHistoryDetail(id).then(res => {
        if (res.status && res.data) {
          setDetailInfo(res.data);
        }
      });
    }
  }, [id]);

  const pagination = useTableData<LeadImportEntryItem>({
    fetchFn: async (params) => {
      if (!id) throw new Error('Import ID missing');
      const response = await leadImportService.getHistoryEntries(id, { ...params, status: activeTab });
      if (response.status) {
        const data = response.data;
        const items = data?.items ?? [];
        return { items, total: data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch import entries');
    },
  });

  // Re-fetch when activeTab changes
  useEffect(() => {
    pagination.setPageNumber(1);
    pagination.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const totalPages = Math.ceil(pagination.totalCount / pagination.limit) || 1;
  const startIndex = (pagination.pageNumber - 1) * pagination.limit;
  const paginatedData = pagination.list;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) { setSelectedRows(paginatedData.map(item => item.id)); }
    else { setSelectedRows([]); }
  };

  const handleSelectRow = (rowId: string) => {
    setSelectedRows(prev => prev.includes(rowId) ? prev.filter(i => i !== rowId) : [...prev, rowId]);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    pagination.handleRowsPerPageChange(Number(e.target.value));
  };

  return (
    <div className="enquiries-page">
      <div className="report-page-header-simple">
        <h1 className="header-title-simple">{detailInfo?.fileName || 'Loading...'}</h1>
      </div>

      <div className="stats-card-row">
        <div className="stat-card">
          <span className="stat-number">{detailInfo?.totalRows || 0}</span>
          <span className="stat-label">Total Records</span>
        </div>
        <div className="stat-card stat-card-success">
          <CheckCircle size={24} className="stat-icon" />
          <span className="stat-number">{detailInfo?.importedCount || 0}</span>
          <span className="stat-label">Imported</span>
        </div>
        <div className="stat-card stat-card-warning">
          <AlertCircle size={24} className="stat-icon" />
          <span className="stat-number">{detailInfo?.duplicateCount || 0}</span>
          <span className="stat-label">Duplicates</span>
        </div>
        <div className="stat-card stat-card-danger">
          <XCircle size={24} className="stat-icon" />
          <span className="stat-number">{detailInfo?.failedCount || 0}</span>
          <span className="stat-label">Failed</span>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'imported' ? 'active' : ''}`}
          onClick={() => setActiveTab('imported')}
        >
          Imported ({detailInfo?.importedCount || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'duplicate' ? 'active' : ''}`}
          onClick={() => setActiveTab('duplicate')}
        >
          Duplicates ({detailInfo?.duplicateCount || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'failed' ? 'active' : ''}`}
          onClick={() => setActiveTab('failed')}
        >
          Failed ({detailInfo?.failedCount || 0})
        </button>
      </div>

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-secondary" onClick={() => pagination.refresh()}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="toolbar-right">
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>
                  {col.key === 'checkbox' ? (
                    <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
                  ) : (
                    <>{col.label}</>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              const rawData = row.rawData || {};
              return (
                <tr key={row.id}>
                  <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                  <td>{row.rowNumber}</td>
                  <td className="lead-name-cell">{rawData.name || '-'}</td>
                  <td>{rawData.phone || '-'}</td>
                  <td>{rawData.email || '-'}</td>
                  <td>{row.errorReason || '-'}</td>
                  <td>{detailInfo?.createdAt ? new Date(detailInfo.createdAt).toLocaleString() : '-'}</td>
                  <td className="meta-cell">{JSON.stringify(rawData)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={pagination.limit} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + pagination.limit, pagination.totalCount)} of {pagination.totalCount}</span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={pagination.pageNumber === 1} onClick={() => pagination.setPageNumber(1)}>First</button>
          <button className="pagination-btn" disabled={pagination.pageNumber === 1} onClick={() => pagination.setPageNumber(prev => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {pagination.pageNumber} of {totalPages}</span>
          <button className="pagination-btn" disabled={pagination.pageNumber === totalPages} onClick={() => pagination.setPageNumber(prev => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={pagination.pageNumber === totalPages} onClick={() => pagination.setPageNumber(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default ImportHistoryDetail;
