import { useState, useCallback } from 'react';
import { campaignTaskApiService } from '../services/index';
import type { CampaignTaskFormData, CampaignTaskApiResponse } from '../types/index';

export function useUpdateCampaignTask() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: number, data: CampaignTaskFormData): Promise<CampaignTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await campaignTaskApiService.update(id, data);
      return response as CampaignTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
