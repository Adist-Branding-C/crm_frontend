import { useCallback, useEffect, useState } from 'react';
import { useTableData } from '../../../shared/hooks/useTableData';
import { campaignLeadsApiService } from '../services';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { CampaignLeadItem } from '../types/campaign-lead';
import type { CampaignLeadStatus } from '../../../shared/constants/enums';

export function useCampaignLeads(campaignId: string | null) {
  const [error, setError] = useState<string | null>(null);

  const {
    list: leads,
    totalCount: totalItems,
    isLoading,
    searchQuery,
    handleSearchChange,
    pageNumber: currentPage,
    setPageNumber: setCurrentPage,
    limit: rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
    refresh,
  } = useTableData<CampaignLeadItem>({
    fetchFn: async (params) => {
      if (!campaignId) return { items: [], total: 0 };
      const response = await campaignLeadsApiService.getForCampaign(campaignId, {
        pageNumber: params.pageNumber,
        limit: params.limit,
        search: params.search,
      });
      return {
        items: response.data?.items ?? [],
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const updateStatus = useCallback(async (leadId: string, status: CampaignLeadStatus) => {
    if (!campaignId) return;
    setError(null);
    try {
      const response = await campaignLeadsApiService.updateLeadStatus(campaignId, leadId, status);
      if (response.status) {
        refresh();
      } else {
        setError(response.message || 'Failed to update lead status');
      }
    } catch (err) {
      setError(parseApiError(err).message);
    }
  }, [campaignId, refresh]);

  const removeLead = useCallback(async (leadId: string): Promise<boolean> => {
    if (!campaignId) return false;
    setError(null);
    try {
      const response = await campaignLeadsApiService.removeLead(campaignId, leadId);
      if (response.status) {
        refresh();
        return true;
      }
      setError(response.message || 'Failed to remove lead');
      return false;
    } catch (err) {
      setError(parseApiError(err).message);
      return false;
    }
  }, [campaignId, refresh]);

  return { 
    leads, 
    isLoading, 
    error, 
    refresh, 
    updateStatus, 
    removeLead,
    totalItems,
    searchQuery,
    setSearchQuery: handleSearchChange,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRowsPerPageChange,
    totalPages,
  };
}
