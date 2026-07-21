import { useTableData } from '../../../shared/hooks/useTableData';
import { automationApiService } from '../services';
import { AutomationMapper } from '../mappers/automation.mapper';
import type { AutomationRule } from '../types/interface';

export function useFetchAutomations() {
  const pagination = useTableData<AutomationRule>({
    fetchFn: async (params) => {
      const response = await automationApiService.getAll({
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
      });
      const items = AutomationMapper.toEntityList(response.data?.items ?? [], params.pageNumber, params.limit);
      const total = response.data?.pagination?.total ?? 0;
      return { items, total };
    },
  });

  return {
    automationList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    totalPages: Math.ceil(pagination.totalCount / pagination.limit) || 1,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    refresh: pagination.refresh,
    setError: pagination.setError,
    setIsLoading: pagination.setIsLoading,
    setSearchQuery: pagination.setSearchQuery,
  };
}
