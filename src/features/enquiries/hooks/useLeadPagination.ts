import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants';
import type { UseLeadPaginationReturn } from '../types/hook.types';

export function useLeadPagination(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  total: number,
): UseLeadPaginationReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const rowsPerPageRef = useRef(rowsPerPage);
  const searchQueryRef = useRef(searchQuery);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
    searchQueryRef.current = searchQuery;
    currentPageRef.current = currentPage;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const totalItems = total;

  const prevSearchQuery = useRef(searchQuery);

  useEffect(() => {
    if (searchQuery === prevSearchQuery.current) return;
    prevSearchQuery.current = searchQuery;
    const timer = setTimeout(() => {
      setCurrentPage(1);
      onFetch(1, rowsPerPageRef.current, searchQuery, activeFiltersRef.current);
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchQuery, onFetch, activeFiltersRef]);

  const handleSetCurrentPage = useCallback((page: number | ((prev: number) => number)) => {
    const next = typeof page === 'function' ? page(currentPageRef.current) : page;
    setCurrentPage(next);
    onFetch(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setRowsPerPage(val);
    setCurrentPage(1);
    onFetch(1, val, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef]);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {
    searchQuery,
    currentPage,
    rowsPerPage,
    startIndex,
    totalItems,
    setSearchQuery,
    handleSetCurrentPage,
    handleRowsPerPageChange,
    resetPage,
  };
}
