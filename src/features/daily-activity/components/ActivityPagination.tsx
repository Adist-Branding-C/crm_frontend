import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ActivityPaginationProps } from '../types';

const ActivityPagination = ({
  currentPage,
  totalPages,
  totalActivities,
  onPageChange,
  getPageNumbers,
}: ActivityPaginationProps) => {
  if (totalActivities <= 0) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default ActivityPagination;
