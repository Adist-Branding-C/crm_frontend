import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants';
import type { UseDealPaginationReturn } from '../types/hook.types';

export function useDealPagination(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  searchQueryRef: React.MutableRefObject<string>,
  total: number,
  totalPages: number,
): UseDealPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const rowsPerPageRef = useRef(rowsPerPage);
  const currentPageRef = useRef(currentPage);
  const totalPagesRef = useRef(totalPages);

  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
    currentPageRef.current = currentPage;
    totalPagesRef.current = totalPages;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const totalItems = total;

  const handleSetCurrentPage = useCallback((page: number | ((prev: number) => number)) => {
    const requested = typeof page === 'function' ? page(currentPageRef.current) : page;
    const maxPage = Math.max(1, totalPagesRef.current);
    const next = Math.min(Math.max(1, requested), maxPage);
    setCurrentPage(next);
    onFetch(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, searchQueryRef]);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
    onFetch(1, value, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, searchQueryRef]);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  useEffect(() => {
    const maxPage = Math.max(1, totalPages);
    if (currentPageRef.current > maxPage) {
      setCurrentPage(maxPage);
      onFetch(maxPage, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
    }
  }, [totalPages, onFetch, activeFiltersRef, searchQueryRef]);

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
