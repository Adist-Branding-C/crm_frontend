import { useState, useCallback } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../../constants/pagination';

const calcStartIndex = (page: number, rows: number) => (page - 1) * rows;

export function useTablePagination(initialRowsPerPage = DEFAULT_ROWS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    resetPage,
    startIndex: calcStartIndex(currentPage, rowsPerPage),
  };
}
