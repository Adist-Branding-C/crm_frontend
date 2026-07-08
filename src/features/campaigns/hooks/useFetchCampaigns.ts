import { useTableData } from '../../../shared/hooks/useTableData';
import { campaignApiService } from '../services';
import { computeSlNo } from '../utils/campaign.utils';
import type { Campaign } from '../types';

export function useFetchCampaigns() {
  const pagination = useTableData<Campaign>({
    fetchFn: async (params) => {
      const response = await campaignApiService.getAll({
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
      });
      const body = response.data as { items?: Campaign[]; pagination?: { total: number } } | undefined;
      const items = (body?.items ?? []).map((item, idx) => ({
        ...item,
        slNo: computeSlNo(idx, params.pageNumber, params.limit),
      }));
      const total = body?.pagination?.total ?? 0;
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
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    refresh: pagination.refresh,
    setError: pagination.setError,
    setIsLoading: pagination.setIsLoading,
    setSearchQuery: pagination.setSearchQuery,
  };
}
