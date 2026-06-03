import { useState, useMemo, useCallback } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';

export function useTablePagination<T>(data: T[], initialRowsPerPage = DEFAULT_ROWS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, startIndex + rowsPerPage),
    [data, startIndex, rowsPerPage]
  );

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  return {
    currentPage: safePage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
    startIndex,
    paginatedData,
  };
}
