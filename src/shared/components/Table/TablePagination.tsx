import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES, LABEL_FIRST, LABEL_LAST, LABEL_PREVIOUS, LABEL_NEXT, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO } from '../../constants/labels';
import type { AdminPaginationProps } from '../../types/crud';

const TablePagination = ({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems,
  onPageChange, onRowsPerPageChange, prevNextOnly,
}: AdminPaginationProps) => (
  <div className="table-footer">
    {!prevNextOnly && (
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
      {totalPages > 1 && (
        <div className="pagination-controls" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {!prevNextOnly && (
            <>
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={16} /></button>
            </>
          )}
          {prevNextOnly && (
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>{LABEL_PREVIOUS}</button>
          )}
          <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
          {!prevNextOnly && (
            <>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={16} /></button>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{LABEL_LAST}</button>
            </>
          )}
          {prevNextOnly && (
            <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>{LABEL_NEXT}</button>
          )}
        </div>
      )}
    </div>
  </div>
);

export default TablePagination;
