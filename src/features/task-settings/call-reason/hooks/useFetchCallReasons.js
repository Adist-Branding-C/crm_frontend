import { useTableData } from '../../../../shared/hooks/useTableData';
import { callReasonApiService } from '../services';
export function useFetchCallReasons() {
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await callReasonApiService.fetchAll(params);
            if (response.status) {
                const data = response.data;
                const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
                return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
            }
            throw new Error(response.message || 'Failed to fetch call reasons');
        },
    });
    return {
        callReasonList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        pageNumber: pagination.pageNumber,
        setPageNumber: pagination.setPageNumber,
        limit: pagination.limit,
        totalCount: pagination.totalCount,
        searchQuery: pagination.searchQuery,
        handleSearchChange: pagination.handleSearchChange,
        handleRowsPerPageChange: pagination.handleRowsPerPageChange,
        refresh: pagination.refresh,
        setError: pagination.setError,
        setIsLoading: pagination.setIsLoading,
        setSearchQuery: pagination.setSearchQuery,
    };
}
//# sourceMappingURL=useFetchCallReasons.js.map