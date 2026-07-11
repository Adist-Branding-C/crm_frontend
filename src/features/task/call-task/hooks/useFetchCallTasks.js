import { useTableData } from '../../../../shared/hooks/useTableData';
import { callTaskApiService } from '../services/index';
export function useFetchCallTasks() {
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await callTaskApiService.fetchAll({
                ...params,
                type: 'CALL_TASK',
            });
            const data = response.data && typeof response.data === 'object'
                ? response.data
                : {};
            const rawData = 'items' in data
                ? data.items
                : Array.isArray(response.data)
                    ? response.data
                    : [];
            const items = Array.isArray(rawData) ? rawData : [];
            const total = typeof data.totalItems === 'number' ? data.totalItems
                : typeof data.total === 'number' ? data.total
                    : typeof data.totalRecords === 'number' ? data.totalRecords
                        : items.length;
            return { items, total };
        },
    });
    return {
        callTaskList: pagination.list,
        isLoading: pagination.isLoading,
        error: pagination.error,
        setError: pagination.setError,
        setIsLoading: pagination.setIsLoading,
        pageNumber: pagination.pageNumber,
        setPageNumber: pagination.setPageNumber,
        limit: pagination.limit,
        totalCount: pagination.totalCount,
        searchQuery: pagination.searchQuery,
        setSearchQuery: pagination.setSearchQuery,
        handleSearchChange: pagination.handleSearchChange,
        handleRowsPerPageChange: pagination.handleRowsPerPageChange,
        refresh: pagination.refresh,
    };
}
//# sourceMappingURL=useFetchCallTasks.js.map