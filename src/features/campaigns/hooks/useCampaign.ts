import { useEffect, useState } from 'react';
import { campaignApiService } from '../services';
import type { Campaign } from '../types/interface';

export function useCampaign(campaignId: string | null) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!campaignId) {
      setCampaign(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    campaignApiService
      .getById(campaignId)
      .then((res) => setCampaign(res.data ?? null))
      .catch(() => setCampaign(null))
      .finally(() => setIsLoading(false));
  }, [campaignId]);

  return { campaign, isLoading };
}
