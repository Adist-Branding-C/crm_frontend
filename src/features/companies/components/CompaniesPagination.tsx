import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CompaniesPaginationProps } from '../types';
import { LABEL_SHOWING, LABEL_TO, LABEL_OF, LABEL_ENTRIES, LABEL_FIRST, LABEL_PAGE, LABEL_LAST } from '../../../shared/constants/labels';

const CompaniesPagination: React.FC<CompaniesPaginationProps> = React.memo(({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems, onPageChange,
}) => (
  <div className="pagination">
    <div className="pagination-info">
      {LABEL_SHOWING} {startIndex + 1} {LABEL_TO} {Math.min(currentPage * rowsPerPage, totalItems)} {LABEL_OF} {totalItems} {LABEL_ENTRIES}
    </div>
    <div className="pagination-controls">
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
      <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={16} /></button>
      <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={16} /></button>
      <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{LABEL_LAST}</button>
    </div>
  </div>
));

CompaniesPagination.displayName = 'CompaniesPagination';
export default CompaniesPagination;
