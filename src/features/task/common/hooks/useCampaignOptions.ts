import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { CampaignOption } from '../types/options';

export function useCampaignOptions() {
  const fetchCampaigns = useCallback(async (): Promise<CampaignOption[]> => {
    const campaignRes = await taskService.getCampaigns();
    if (campaignRes.status && campaignRes.data?.items) {
      return campaignRes.data.items.map((c: { id: number; campaignName?: string; name?: string }) => ({ value: String(c.id), label: c.campaignName ?? c.name ?? '' }));
    }
    return [];
  }, []);

  const { options: campaignOptions, isLoading: campaignLoading, load: loadCampaigns } = useLookupOptions(fetchCampaigns);

  return { campaignOptions, campaignLoading, loadCampaigns };
}
