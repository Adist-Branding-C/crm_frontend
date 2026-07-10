import { useTableData } from '../../../shared/hooks/useTableData';
import { campaignApiService } from '../services';
import { CampaignMapper } from '../mappers/campaign.mapper';
import type { Campaign } from '../types/interface';

export function useFetchCampaigns() {
  const pagination = useTableData<Campaign>({
    fetchFn: async (params) => {
      const response = await campaignApiService.getAll({
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
      });
      const items = CampaignMapper.toEntityList(response.data?.items ?? [], params.pageNumber, params.limit);
      const total = response.data?.pagination?.total ?? 0;
      return { items, total };
    },
  });

  return {
    campaignList: pagination.list,
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
