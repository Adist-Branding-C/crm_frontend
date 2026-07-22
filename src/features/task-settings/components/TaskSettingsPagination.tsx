import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES, LABEL_FIRST, LABEL_LAST, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO } from '../../../shared/constants/labels';
import type { TaskSettingsPaginationProps } from '../types/task-settings-pagination.types';

const TaskSettingsPagination: React.FC<TaskSettingsPaginationProps> = React.memo(({
  currentPage, totalPages, startIndex, rowsPerPage, totalItems,
  onPageChange, onRowsPerPageChange, showRowsSelector,
}) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.max(1, Number(currentPage) || 1);

  return (
    <div className="table-footer">
      {showRowsSelector && (
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
        <div className="pagination-controls" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
          <button className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => onPageChange(safeCurrentPage - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">{LABEL_PAGE} {safeCurrentPage} {LABEL_OF} {safeTotalPages}</span>
          <button className="pagination-btn" disabled={safeCurrentPage === safeTotalPages} onClick={() => onPageChange(safeCurrentPage + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={safeCurrentPage === safeTotalPages} onClick={() => onPageChange(safeTotalPages)}>{LABEL_LAST}</button>
        </div>
      </div>
    </div>
  );
});

TaskSettingsPagination.displayName = 'TaskSettingsPagination';
export default TaskSettingsPagination;
