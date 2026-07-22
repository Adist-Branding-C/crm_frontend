import { useState, useCallback } from 'react';

export function useSpotlightPagination(initialRowsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
    },
    [],
  );

  const startIndex = (currentPage - 1) * rowsPerPage;

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    resetPage,
    startIndex,
  };
}
