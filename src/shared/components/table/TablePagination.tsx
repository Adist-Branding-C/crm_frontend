import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LABEL_FIRST, LABEL_LAST, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO, LABEL_ENTRIES } from '../../constants/labels';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({ currentPage, totalPages, rowsPerPage, totalRecords, onPageChange }: TablePaginationProps) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.max(1, Number(currentPage) || 1);
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <div className="table-footer">
      <div className="table-info">
        {LABEL_SHOWING} {Math.min(startIndex + 1, totalRecords)} {LABEL_TO} {Math.min(startIndex + rowsPerPage, totalRecords)} {LABEL_OF} {totalRecords} {LABEL_ENTRIES}
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
};

export default TablePagination;
