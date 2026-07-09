import { useTableData } from '../../../../shared/hooks/useTableData';
import { campaignTaskApiService } from '../services/index';
import type { CampaignTaskItem } from '../types/index';

export function useFetchCampaignTasks() {
  const pagination = useTableData<CampaignTaskItem>({
    fetchFn: async (params) => {
      const response = await campaignTaskApiService.fetchAll({
        ...params,
        type: 'CAMPAIGN_TASK',
      });
      const data = response.data && typeof response.data === 'object'
        ? (response.data as unknown as Record<string, unknown>)
        : {};
      const rawData = 'items' in data
        ? (data.items as CampaignTaskItem[])
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
    campaignTaskList: pagination.list,
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
