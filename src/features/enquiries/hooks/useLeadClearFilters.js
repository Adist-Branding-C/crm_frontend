import { useCallback } from 'react';
import { INITIAL_FILTERS } from '../constants';
export function useLeadClearFilters(filtersHook, leadSearch, pagination, sortHook, fetchLeads, rowsPerPageRef) {
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
//# sourceMappingURL=useLeadClearFilters.js.map