import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { LABEL_ROWS_PER_PAGE } from '../../../shared/constants/labels';
import type { FollowupPaginationProps } from '../types';

const FollowupPagination: React.FC<FollowupPaginationProps> = React.memo(
  ({
    currentPage,
    totalPages,
    startIndex,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange,
  }) => (
    <div className="pagination-container">
      <div className="pagination-left">
        <span className="rows-label">{LABEL_ROWS_PER_PAGE}</span>
        <select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          className="rows-select"
        >
          {ROWS_OPTIONS_10_25_50_100.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="pagination-info">
          Showing {totalItems === 0 ? 0 : startIndex + 1}-
          {Math.min(startIndex + rowsPerPage, totalItems)} of {totalItems}
        </span>
      </div>
      <div className="pagination-right">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </button>
        <button
          className="pagination-btn"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange((prev) => prev - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange((prev) => prev + 1)}
        >
          <ChevronRight size={16} />
        </button>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </button>
      </div>
    </div>
  ),
);

FollowupPagination.displayName = 'FollowupPagination';
export default FollowupPagination;
