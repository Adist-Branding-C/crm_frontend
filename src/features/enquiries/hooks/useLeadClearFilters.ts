import { useCallback } from 'react';
import { INITIAL_FILTERS } from '../constants';
import type { UseLeadFiltersReturn, UseLeadSearchReturn, UseLeadPaginationReturn, UseLeadSortReturn } from '../types/hook.types';

export function useLeadClearFilters(
  filtersHook: UseLeadFiltersReturn,
  leadSearch: UseLeadSearchReturn,
  pagination: UseLeadPaginationReturn,
  sortHook: UseLeadSortReturn,
  fetchLeads: (page: number, limit: number, search: string, extraParams: Record<string, string | number>) => void,
  rowsPerPageRef: React.MutableRefObject<number>,
): () => void {
  return useCallback(() => {
    filtersHook.setFilters({ ...INITIAL_FILTERS, additionalFields: {} });
    filtersHook.setShowFilters(false);
    filtersHook.activeFiltersRef.current = {};
    leadSearch.resetSearch();
    pagination.resetPage();
    sortHook.resetSort();
    fetchLeads(1, rowsPerPageRef.current, '', {});
  }, [filtersHook, leadSearch, pagination, sortHook, fetchLeads, rowsPerPageRef]);
}
