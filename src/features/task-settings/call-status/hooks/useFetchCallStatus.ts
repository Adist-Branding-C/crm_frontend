import { useTableData } from '../../../../shared/hooks/useTableData';
import { ResponseMapper } from '../../../../shared/mappers/response.mapper';
import { callStatusApiService } from '../services';
import type { CallStatusItem } from '../types/index';

export function useFetchCallStatus() {
  const pagination = useTableData<CallStatusItem>({
    fetchFn: async (params) => {
      const response = await callStatusApiService.fetchAll(params);
      if (response.status) {
        return ResponseMapper.toPagedList<CallStatusItem>(response.data);
      }
      throw new Error(response.message || 'Failed to fetch call statuses');
    },
  });

  return {
    callStatusList: pagination.list,
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
