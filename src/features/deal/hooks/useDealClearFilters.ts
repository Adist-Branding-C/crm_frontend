import { useCallback } from 'react';
import { INITIAL_DEAL_FILTERS } from '../constants/deal.constants';

export function useDealClearFilters(
  filtersHook: {
    setFilters: (filters: typeof INITIAL_DEAL_FILTERS) => void;
    setShowFilters: (v: boolean) => void;
    activeFiltersRef: React.MutableRefObject<Record<string, string | number>>;
  },
  resetSearch: () => void,
  resetPage: () => void,
  fetchDeals: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  rowsPerPageRef: React.MutableRefObject<number>,
): () => void {
  return useCallback(() => {
    filtersHook.setFilters(INITIAL_DEAL_FILTERS);
    filtersHook.setShowFilters(false);
    filtersHook.activeFiltersRef.current = {};
    resetSearch();
    resetPage();
    fetchDeals(1, rowsPerPageRef.current, '', {});
  }, [filtersHook, resetSearch, resetPage, fetchDeals, rowsPerPageRef]);
}
