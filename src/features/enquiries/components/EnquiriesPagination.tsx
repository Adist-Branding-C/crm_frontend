import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { EnquiriesPaginationProps } from '../types';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { LABEL_SHOW_ENTRIES,LABEL_ROWS_PER_PAGE, LABEL_SHOWING, LABEL_OF, LABEL_FIRST, LABEL_PAGE, LABEL_LAST } from '../../../shared/constants/labels';

const EnquiriesPagination: React.FC<EnquiriesPaginationProps> = React.memo(({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange,
}) => (
  <div className="pagination-container">
    <div className="pagination-left">
      <span className="rows-label">{LABEL_ROWS_PER_PAGE}</span>
      <select value={rowsPerPage} onChange={onRowsPerPageChange} className="rows-select">
        {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <span className="pagination-info">
        {LABEL_SHOWING} {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalItems)} {LABEL_OF} {totalItems}
      </span>
    </div>
    <div className="pagination-right">
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(prev => prev - 1)}>
        <ChevronLeft size={16} />
      </button>
      <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(prev => prev + 1)}>
        <ChevronRight size={16} />
      </button>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{LABEL_LAST}</button>
    </div>
  </div>
));

EnquiriesPagination.displayName = 'EnquiriesPagination';
export default EnquiriesPagination;
