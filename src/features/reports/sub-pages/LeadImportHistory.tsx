import React, { useEffect, useState } from 'react';
import {
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './ReportsSubPages.css';
import ImportModal from '../components/ImportModal';
import Toast from '../../../shared/components/Toast';
import { useToast } from '../../../shared/hooks/useToast';
import { useImportHistoryData } from '../hooks/useImportHistoryData';
import { importHistoryColumns as columns } from '../constants/historyReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import type { ImportHistoryApiItem } from '../types';

const STATUS_BADGE_CLASS: Record<string, string> = {
  completed: 'badge-active',
  processing: 'badge-pending',
  pending: 'badge-pending',
  failed: 'badge-inactive',
};

const LeadImportHistory: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    imports,
    total,
    totalPages,
    isLoading,
    fetchImports,
    uploadFile,
    downloadSample,
  } = useImportHistoryData(toast.showToastMessage);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchImports(currentPage, rowsPerPage, searchQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage, searchQuery]);

  // Processing happens asynchronously in the RabbitMQ worker,
  // so poll while an import is still pending/processing.
  useEffect(() => {
    const hasInFlightImport = imports.some(
      (row) => row.status === 'pending' || row.status === 'processing',
    );

    if (!hasInFlightImport) return;

    const timer = setTimeout(() => {
      fetchImports(currentPage, rowsPerPage, searchQuery);
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    imports,
    currentPage,
    rowsPerPage,
    searchQuery,
    fetchImports,
  ]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleView = (importId: string) => {
    navigate(`/reports/lead/import-history/${importId}`);
  };

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleRefresh = () => {
    fetchImports(currentPage, rowsPerPage, searchQuery);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <div className="enquiries-page">
      <Toast
        message={toast.toastMessage}
        type={toast.toastType}
        isVisible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />

      <ImportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpload={uploadFile}
        onDownloadSample={downloadSample}
      />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            Import Contact
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
          >
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
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  {col.key === 'checkbox' ? null : col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                  }}
                >
                  Loading…
                </td>
              </tr>
            ) : imports.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                  }}
                >
                  No imports yet
                </td>
              </tr>
            ) : (
              imports.map(
                (row: ImportHistoryApiItem, index: number) => (
                  <tr key={row.importId}>
                    <td></td>

                    <td className="action-cell">
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleView(row.importId)
                        }
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>

                    <td>{startIndex + index + 1}</td>

                    <td>
                      {formatDateTime(row.createdAt)}
                    </td>

                    <td className="lead-name-cell">
                      {row.fileName}
                    </td>

                    <td>{row.totalRows}</td>

                    <td>{row.failedCount}</td>

                    <td>
                      <strong>{row.successCount}</strong>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          STATUS_BADGE_CLASS[row.status] ??
                          'badge-inactive'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">
            Rows per page:
          </span>

          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="rows-select"
          >
            {ROWS_OPTIONS_10_25_50.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <span className="pagination-info">
            Showing{' '}
            {total === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + rowsPerPage, total)} of{' '}
            {total}
          </span>
        </div>

        <div className="pagination-right">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>

          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            <ChevronLeft size={16} />
          </button>

          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            <ChevronRight size={16} />
          </button>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(totalPages)
            }
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadImportHistory;