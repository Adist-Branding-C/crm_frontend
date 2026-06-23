import { useState, useCallback } from 'react';
import { campaignService } from '../services/campaign.service';
import type { Campaign } from '../types/campaign.types';
import type { GetCampaignsParams } from '../types/campaign.types';

export function useCampaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = useCallback(async (params: GetCampaignsParams) => {
    setLoading(true);
    try {
      const res = await campaignService.getAll(params);
      const body = res.data as { status: boolean; data?: { items: Campaign[]; pagination: { total: number; total_pages: number } } };
      const { campaigns: mapped, totalItems: total } = campaignService.transformResponse(body, params.pageNumber, params.limit);
      setCampaigns(mapped);
      setTotalItems(total);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  return { campaigns, totalItems, loading, setCampaigns, setTotalItems, fetchCampaigns };
}
