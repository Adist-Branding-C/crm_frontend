import { useState, useCallback } from 'react';
import { campaignTaskApiService } from '../services/index';
import type { CampaignTaskFormData, CampaignTaskApiResponse } from '../types/index';

export function useCreateCampaignTask() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: CampaignTaskFormData): Promise<CampaignTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await campaignTaskApiService.create(data);
      return response as CampaignTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
