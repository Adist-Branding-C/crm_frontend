import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import {
  LABEL_ROWS_PER_PAGE, LABEL_SHOWING, LABEL_OF,
  LABEL_FIRST, LABEL_PAGE, LABEL_LAST,
} from '../../constants/labels';
import type { TablePaginationProps } from './types';

const TablePagination: React.FC<TablePaginationProps> = React.memo(({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems,
  onPageChange, onRowsPerPageChange,
  rowsPerPageOptions = ROWS_OPTIONS_10_25_50_100,
  showRowsSelector = true,
  labelRowsPerPage = LABEL_ROWS_PER_PAGE,
  labelShowing = LABEL_SHOWING,
  labelOf = LABEL_OF,
  labelPage = LABEL_PAGE,
  labelFirst = LABEL_FIRST,
  labelLast = LABEL_LAST,
}) => (
  <div className="pagination-container">
    {showRowsSelector && onRowsPerPageChange && (
      <div className="pagination-left">
        <span className="rows-label">{labelRowsPerPage}</span>
        <select value={rowsPerPage} onChange={onRowsPerPageChange} className="rows-select">
          {rowsPerPageOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="pagination-info">
          {labelShowing} {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalItems)} {labelOf} {totalItems}
        </span>
      </div>
    )}
    <div className="pagination-right">
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>{labelFirst}</button>
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(p => (p as number) - 1)}>
        <ChevronLeft size={16} />
      </button>
      <span className="page-indicator">{labelPage} {currentPage} {labelOf} {totalPages}</span>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(p => (p as number) + 1)}>
        <ChevronRight size={16} />
      </button>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{labelLast}</button>
    </div>
  </div>
));

TablePagination.displayName = 'TablePagination';
export default TablePagination;
