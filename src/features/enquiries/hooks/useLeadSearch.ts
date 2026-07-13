import { useCallback } from 'react';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import type { UseLeadSearchReturn } from '../types/hook.types';

export function useLeadSearch(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  rowsPerPageRef: React.MutableRefObject<number>,
  resetPage: () => void,
): UseLeadSearchReturn {
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
