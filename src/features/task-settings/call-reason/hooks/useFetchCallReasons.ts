import { useTableData } from '../../../../shared/hooks/useTableData';
import { ResponseMapper } from '../../../../shared/mappers/response.mapper';
import { callReasonApiService } from '../services';
import type { CallReason } from '../types/index';

export function useFetchCallReasons() {
  const pagination = useTableData<CallReason>({
    fetchFn: async (params) => {
      const response = await callReasonApiService.fetchAll(params);
      if (response.status) {
        return ResponseMapper.toPagedList<CallReason>(response.data);
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
