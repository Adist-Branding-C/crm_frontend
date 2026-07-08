import { useState, useCallback } from 'react';
import { campaignApiService } from '../services';
import type { CreateCampaignPayload } from '../types';
import type { ApiResponse } from '../../../shared/types/common';

export function useCreateCampaign() {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (payload: CreateCampaignPayload): Promise<ApiResponse<unknown> | null> => {
    setIsLoading(true);
    try {
      return await campaignApiService.create(payload);
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading };
}
