import { useState, useCallback } from 'react';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import type { UseLeadSearchReturn } from '../types/hook.types';

export function useLeadSearch(
  onFetch: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>,
  rowsPerPageRef: React.MutableRefObject<number>,
  resetPage: () => void,
): UseLeadSearchReturn {
  const [committedSearch, setCommittedSearch] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setCommittedSearch(value);
    resetPage();
    onFetch(1, rowsPerPageRef.current, value, activeFiltersRef.current);
  }, [onFetch, activeFiltersRef, rowsPerPageRef, resetPage]);

  const { searchValue, handleSearchInput } = useDebouncedSearch(committedSearch, handleSearchChange, 2000);

  const resetSearch = useCallback(() => setCommittedSearch(''), []);

  return {
    searchQuery: searchValue,
    setSearchQuery: handleSearchInput,
    resetSearch,
  };
}
