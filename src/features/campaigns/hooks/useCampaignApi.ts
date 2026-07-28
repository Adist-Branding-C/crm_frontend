import { useCallback } from 'react';
import { campaignApiService } from '../services';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types';
import type { ApiResponse } from '../../../shared/types/common';

export function useCampaignApi() {
  const create = useCallback(async (payload: CreateCampaignPayload): Promise<ApiResponse<unknown>> => {
    return await campaignApiService.create(payload);
  }, []);

  const update = useCallback(async (id: string, payload: UpdateCampaignPayload): Promise<ApiResponse<unknown>> => {
    return await campaignApiService.update(id, payload);
  }, []);

  const remove = useCallback(async (id: string): Promise<ApiResponse<null>> => {
    return await campaignApiService.delete(id);
  }, []);

  return { create, update, remove };
}
