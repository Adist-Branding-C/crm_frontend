import { useState, useCallback, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants';
import type { UseLeadPaginationReturn } from '../types/hook.types';

export function useLeadPagination(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  searchQueryRef: React.MutableRefObject<string>,
  total: number,
): UseLeadPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const rowsPerPageRef = useRef(rowsPerPage);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
    currentPageRef.current = currentPage;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const totalItems = total;

  const handleSetCurrentPage = useCallback((page: number | ((prev: number) => number)) => {
    const next = typeof page === 'function' ? page(currentPageRef.current) : page;
    setCurrentPage(next);
    onFetch(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, searchQueryRef]);

  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
    onFetch(1, value, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, searchQueryRef]);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    rowsPerPage,
    startIndex,
    totalItems,
    handleSetCurrentPage,
    handleRowsPerPageChange,
    resetPage,
  };
}
