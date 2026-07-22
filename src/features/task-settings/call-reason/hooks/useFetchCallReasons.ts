import { useTableData } from '../../../../shared/hooks/useTableData';
import { ResponseMapper } from '../../../../shared/mappers/response.mapper';
import { callReasonApiService } from '../services';
import type { CallReasonItem } from '../types/index';

/**
 * Fetches the call-reason list with pagination/search state via the shared useTableData hook,
 * mapping the raw response through the shared ResponseMapper. All of the page's list state
 * (page number, search, row count) lives here rather than in the page component.
 */
export function useFetchCallReasons() {
  const pagination = useTableData<CallReasonItem>({
    fetchFn: async (params) => {
      const response = await callReasonApiService.fetchAll(params);
      if (response.status) {
        return ResponseMapper.toPagedList<CallReasonItem>(response.data);
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
    startIndex: pagination.startIndex,
    totalPages: pagination.totalPages,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    refresh: pagination.refresh,
    setError: pagination.setError,
    setIsLoading: pagination.setIsLoading,
    setSearchQuery: pagination.setSearchQuery,
  };
}
