import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LeadsPaginationProps } from '../types';
import { LABEL_SHOWING, LABEL_TO, LABEL_OF, LABEL_ENTRIES, LABEL_PREVIOUS, LABEL_NEXT } from '../../../shared/constants/labels';

const LeadsPagination: React.FC<LeadsPaginationProps> = React.memo(({ currentPage, totalPages, totalItems, rowsPerPage, onPageChange }) => (
  <div className="pagination-bar">
    <span className="showing-text">
      {LABEL_SHOWING} {(currentPage - 1) * rowsPerPage + 1} {LABEL_TO} {Math.min(currentPage * rowsPerPage, totalItems)} {LABEL_OF} {totalItems} {LABEL_ENTRIES}
    </span>
    <div className="pagination-controls">
      <button className="pagination-btn" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        <ChevronLeft size={14} /> {LABEL_PREVIOUS}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} className={`pagination-number ${currentPage === page ? 'active' : ''}`} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button className="pagination-btn" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        {LABEL_NEXT} <ChevronRight size={14} />
      </button>
    </div>
  </div>
));

LeadsPagination.displayName = 'LeadsPagination';
export default LeadsPagination;
