import { useEffect, useRef, useState } from 'react';
import { useTableData } from '../../../shared/hooks/useTableData';
import { campaignApiService } from '../services';
import { CampaignMapper } from '../mappers/campaign.mapper';
import type { Campaign } from '../types/interface';
import type { CampaignFilters, CampaignSortField } from '../types/hook';

const NO_FILTERS: CampaignFilters = {};

export function useFetchCampaigns() {
  const [sortBy, setSortBy] = useState<CampaignSortField>('createdAt');
  const [filters, setFilters] = useState<CampaignFilters>(NO_FILTERS);

  const pagination = useTableData<Campaign>({
    fetchFn: async (params) => {
      const response = await campaignApiService.getAll({
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
        sortBy,
        sortOrder: params.sortOrder,
        ...filters,
      });
      const items = CampaignMapper.toEntityList(response.data?.items ?? [], params.pageNumber, params.limit);
      const total = response.data?.pagination?.total ?? 0;
      return { items, total };
    },
    initialSortOrder: 'DESC',
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (pagination.pageNumber === 1) {
      pagination.refresh(1);
    } else {
      pagination.setPageNumber(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, filters]);

  const handleSortChange = (field: CampaignSortField) => {
    if (field === sortBy) {
      pagination.toggleSortOrder();
    } else {
      setSortBy(field);
    }
  };

  const setFilter = (patch: Partial<CampaignFilters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      (Object.keys(next) as Array<keyof CampaignFilters>).forEach((key) => {
        if (!next[key]) delete next[key];
      });
      return next;
    });
  };

  const clearFilters = () => setFilters(NO_FILTERS);

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
    sortBy,
    sortOrder: pagination.sortOrder,
    onSortChange: handleSortChange,
    filters,
    setFilter,
    clearFilters,
  };
}
