import { useTableData } from '../../../../shared/hooks/useTableData';
import { designationApiService } from '../services';
import type { DesignationItem } from '../types';

export function useFetchDesignations() {
  const pagination = useTableData<DesignationItem>({
    fetchFn: async (params) => {
      const response = await designationApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: DesignationItem[]; total?: number } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch designations');
    },
  });

  return {
    designationList: pagination.list,
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
