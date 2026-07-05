import { useState, useCallback } from 'react';
import { campaignTaskApiService } from '../services/index';
import type { CampaignTaskApiResponse } from '../types/index';

export function useDeleteCampaignTask() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: number): Promise<CampaignTaskApiResponse | null> => {
    setIsLoading(true);
    try {
      const response = await campaignTaskApiService.delete(id);
      return response as unknown as CampaignTaskApiResponse;
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
