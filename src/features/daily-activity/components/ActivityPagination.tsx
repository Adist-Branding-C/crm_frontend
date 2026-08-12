import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ActivityPaginationProps } from '../types';

const ActivityPagination = memo(({
  currentPage,
  totalPages,
  totalActivities,
  pageNumbers,
  isLoading,
  onPageChange,
}: ActivityPaginationProps) => {
  if (totalActivities <= 0) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={isLoading || currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <div className="pagination-numbers">
        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className="pagination-btn next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={isLoading || currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
});

ActivityPagination.displayName = 'ActivityPagination';

export default ActivityPagination;
