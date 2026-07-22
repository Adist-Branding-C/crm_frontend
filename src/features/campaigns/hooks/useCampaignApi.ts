import { useCallback } from 'react';
import { campaignApiService } from '../services';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types';
import type { ApiResponse } from '../../../shared/types/common';

export function useCampaignApi() {
  const create = useCallback(async (payload: CreateCampaignPayload): Promise<ApiResponse<unknown> | null> => {
    try {
      return await campaignApiService.create(payload);
    } catch {
      return null;
    }
  }, []);

  const update = useCallback(async (id: string, payload: UpdateCampaignPayload): Promise<ApiResponse<unknown> | null> => {
    try {
      return await campaignApiService.update(id, payload);
    } catch {
      return null;
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<ApiResponse<null> | null> => {
    try {
      return await campaignApiService.delete(id);
    } catch {
      return null;
    }
  }, []);

  return { create, update, remove };
}
