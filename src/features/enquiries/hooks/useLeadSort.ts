import { useState, useCallback, useRef, useEffect } from 'react';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { UseLeadSortReturn } from '../types/hook.types';

const DEFAULT_SORT = { key: 'createdAt', direction: SortDirection.DESC };

export function useLeadSort(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  searchQueryRef: React.MutableRefObject<string>,
  rowsPerPageRef: React.MutableRefObject<number>,
): UseLeadSortReturn {
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT);
  const sortConfigRef = useRef(sortConfig);

  useEffect(() => {
    sortConfigRef.current = sortConfig;
  }, [sortConfig]);

  const handleSort = useCallback((key: string) => {
    const direction = sortConfigRef.current.key === key && sortConfigRef.current.direction === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
    const newConfig = { key, direction };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: direction.toUpperCase() };
    onFetch(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, rowsPerPageRef, searchQueryRef]);

  const handleSortDesc = useCallback((key: string) => {
    const newConfig = { key, direction: SortDirection.DESC };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: 'DESC' };
    onFetch(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, rowsPerPageRef, searchQueryRef]);

  const handleSortAsc = useCallback((key: string) => {
    const newConfig = { key, direction: SortDirection.ASC };
    setSortConfig(newConfig);
    activeFiltersRef.current = { ...activeFiltersRef.current, sort_by: key, sort_order: 'ASC' };
    onFetch(1, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, rowsPerPageRef, searchQueryRef]);

  const resetSort = useCallback(() => {
    setSortConfig(DEFAULT_SORT);
  }, []);

  return {
    sortConfig,
    handleSort,
    handleSortDesc,
    handleSortAsc,
    resetSort,
  };
}
