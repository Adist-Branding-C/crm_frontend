import { useCallback } from 'react';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
export function useLeadSearch(onFetch, activeFiltersRef, rowsPerPageRef, resetPage) {
    const handleCommittedSearch = useCallback((value) => {
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
//# sourceMappingURL=useLeadSearch.js.map