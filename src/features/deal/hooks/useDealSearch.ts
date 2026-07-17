import { useCallback } from 'react';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import type { UseDealSearchReturn } from '../types/hook.types';

export function useDealSearch(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  rowsPerPageRef: React.MutableRefObject<number>,
  resetPage: () => void,
): UseDealSearchReturn {
  const handleCommittedSearch = useCallback((value: string) => {
    resetPage();
    onFetch(1, rowsPerPageRef.current, value, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, rowsPerPageRef, resetPage]);

  const { searchValue, handleSearchChange, resetSearch } = useDebouncedSearch(handleCommittedSearch, 2000);

  return {
    searchQuery: searchValue,
    setSearchQuery: handleSearchChange,
    resetSearch,
  };
}
