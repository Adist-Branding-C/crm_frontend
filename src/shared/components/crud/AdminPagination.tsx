import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES, LABEL_FIRST, LABEL_LAST, LABEL_PREVIOUS, LABEL_NEXT, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO } from '../../constants/labels';
import type { AdminPaginationProps } from '../../types/crud';

const AdminPagination: React.FC<AdminPaginationProps> = React.memo(({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems,
  onPageChange, onRowsPerPageChange, showRowsSelector, prevNextOnly,
}) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.max(1, Number(currentPage) || 1);

  return (
    <div className="table-footer">
      {!prevNextOnly && showRowsSelector && (
        <div className="entries-select">
          <label>
            {LABEL_SHOW}
            <select value={rowsPerPage} onChange={onRowsPerPageChange}>
              {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            {LABEL_ENTRIES}
          </label>
        </div>
      )}
      <div className="table-info">
        {LABEL_SHOWING} {Math.min(startIndex + 1, totalItems)} {LABEL_TO} {Math.min(startIndex + rowsPerPage, totalItems)} {LABEL_OF} {totalItems} {LABEL_ENTRIES}
      </div>
      <div className="table-controls">
        {safeTotalPages > 1 && (
          <div className="pagination-controls" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {!prevNextOnly && (
              <>
                <button className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
                <button className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => onPageChange(safeCurrentPage - 1)}><ChevronLeft size={16} /></button>
              </>
            )}
            {prevNextOnly && (
              <button className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => onPageChange(safeCurrentPage - 1)}>{LABEL_PREVIOUS}</button>
            )}
            <span className="page-indicator">{LABEL_PAGE} {safeCurrentPage} {LABEL_OF} {safeTotalPages}</span>
            {!prevNextOnly && (
              <>
                <button className="pagination-btn" disabled={safeCurrentPage === safeTotalPages} onClick={() => onPageChange(safeCurrentPage + 1)}><ChevronRight size={16} /></button>
                <button className="pagination-btn" disabled={safeCurrentPage === safeTotalPages} onClick={() => onPageChange(safeTotalPages)}>{LABEL_LAST}</button>
              </>
            )}
            {prevNextOnly && (
              <button className="pagination-btn" disabled={safeCurrentPage === safeTotalPages} onClick={() => onPageChange(safeCurrentPage + 1)}>{LABEL_NEXT}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

AdminPagination.displayName = 'AdminPagination';
export default AdminPagination;