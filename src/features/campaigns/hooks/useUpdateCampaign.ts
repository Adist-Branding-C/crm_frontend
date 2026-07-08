import { useState, useCallback } from 'react';
import { campaignApiService } from '../services';
import type { UpdateCampaignPayload } from '../types';
import type { ApiResponse } from '../../../shared/types/common';

export function useUpdateCampaign() {
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(async (id: string, payload: UpdateCampaignPayload): Promise<ApiResponse<unknown> | null> => {
    setIsLoading(true);
    try {
      return await campaignApiService.update(id, payload);
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { update, isLoading };
}
