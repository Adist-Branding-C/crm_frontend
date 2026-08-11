import React, { useState, useRef } from 'react';
import {
  RefreshCw, Search, ChevronLeft, ChevronRight,
  Eye, Plus, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ReportsSubPages.css';
import { importHistoryColumns as columns } from '../constants/historyReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import type { LeadImportHistoryModalProps, LeadImportHistoryItem } from '../types';
import { useTableData } from '../../../shared/hooks/useTableData';
import { leadImportService } from '../services/leadImportService';
import { useToast } from '../../../shared/hooks/useToast';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';
import ToastNotification from '../../../shared/components/ToastNotification';
import { getErrorMessage } from '../../../shared/utils/error';

const ImportModal: React.FC<LeadImportHistoryModalProps & { onSuccess: () => void }> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleDownloadSample = async () => {
    try {
      const { data: blob } = await leadImportService.downloadSample();
      triggerBlobDownload(blob, 'Leads_Import_Sample.xlsx');
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to download sample file'), 'error');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.showToastMessage('Please select a file to upload', 'error');
      return;
    }
    setUploading(true);
    try {
      await leadImportService.uploadFile(file);
      toast.showToastMessage('File uploaded successfully', 'success');
      onSuccess();
      onClose();
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to upload file'), 'error');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Contacts</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="upload-section">
            <label>Upload File</label>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                accept=".xlsx" 
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <button className="btn-link" onClick={handleDownloadSample}>Download Sample File</button>
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
{`Name,Country Code,Mobile Number,Lead Source,Email
ABC,+1,1234567890,Website,
,+91,9876543210,Referral,,john@example.com`}
            </pre>
          </div>

          <div className="format-note">
            <p>Please ensure the date is formatted as either yyyy-mm-dd or dd-mm-yyyy.</p>
            <p>Examples: 2021-12-31 or 31-12-2021. Dates are used to track when the lead was generated or updated.</p>
            <p>Note: Any duplicate phone number rows in the file will be skipped automatically.</p>
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button className="btn btn-secondary" onClick={onClose} disabled={uploading}>Cancel</button>
          </div>
        </div>
      </div>
      <ToastNotification isVisible={toast.showToast} type={toast.toastType} message={toast.toastMessage} onDismiss={() => toast.setShowToast(false)} />
    </div>
  );
};

const LeadImportHistory: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const pagination = useTableData<LeadImportHistoryItem>({
    fetchFn: async (params) => {
      const response = await leadImportService.getHistory(params);
      if (response.status) {
        const data = response.data;
        const items = data?.items ?? [];
        return { items, total: data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch import history');
    },
  });

  const totalPages = Math.ceil(pagination.totalCount / pagination.limit) || 1;
  const startIndex = (pagination.pageNumber - 1) * pagination.limit;
  const paginatedData = pagination.list;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) { setSelectedRows(paginatedData.map(item => item.importId)); }
    else { setSelectedRows([]); }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    pagination.handleRowsPerPageChange(Number(e.target.value));
  };

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      completed: 'badge-active',
      success: 'badge-active',
      processing: 'badge-pending',
      failed: 'badge-inactive',
      pending: 'badge-pending'
    };
    return statusClasses[status.toLowerCase()] || 'badge-inactive';
  };

  const handleView = (id: string) => {
    navigate(`/reports/lead/import-history/${id}`);
  };

  return (
    <div className="enquiries-page">
      <ImportModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={() => pagination.refresh()} />
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            Import Contact
          </button>
          <button className="btn btn-secondary" onClick={() => pagination.refresh()}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search..." value={pagination.searchQuery} onChange={pagination.handleSearchChange} className="search-input" />
          </div>
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
            {paginatedData.map((row, index) => (
              <tr key={row.importId}>
                <td><input type="checkbox" checked={selectedRows.includes(row.importId)} onChange={() => handleSelectRow(row.importId)} /></td>
                <td className="action-cell">
                  <button
                    className="action-btn"
                    onClick={() => handleView(row.importId)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </td>
                <td>{startIndex + index + 1}</td>
                <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '-'}</td>
                <td className="lead-name-cell">{row.fileName}</td>
                <td>{row.totalRows}</td>
                <td>{row.duplicateCount}</td>
                <td>{row.failedCount}</td>
                <td><strong>{row.importedCount}</strong></td>
                <td><span className={`badge ${getStatusBadge(row.status)}`}>{row.status}</span></td>
              </tr>
            ))}
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

export default LeadImportHistory;
