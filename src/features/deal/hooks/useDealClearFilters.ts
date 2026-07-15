import { useCallback } from 'react';
import { INITIAL_DEAL_FILTERS } from '../constants';
import type { UseDealFiltersReturn, UseDealSearchReturn, UseDealPaginationReturn, UseDealSortReturn } from '../types/hook.types';

export function useDealClearFilters(
  filtersHook: UseDealFiltersReturn,
  dealSearch: UseDealSearchReturn,
  pagination: UseDealPaginationReturn,
  sortHook: UseDealSortReturn,
  fetchDeals: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  rowsPerPageRef: React.MutableRefObject<number>,
): () => void {
  return useCallback(() => {
    filtersHook.setFilters({ ...INITIAL_DEAL_FILTERS, additionalFields: {} });
    filtersHook.setShowFilters(false);
    filtersHook.activeFiltersRef.current = {};
    dealSearch.resetSearch();
    pagination.resetPage();
    sortHook.resetSort();
    fetchDeals(1, rowsPerPageRef.current, '', {});
  }, [filtersHook, dealSearch, pagination, sortHook, fetchDeals, rowsPerPageRef]);
}
