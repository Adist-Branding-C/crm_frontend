import { useState, useCallback } from 'react';
import { campaignApiService } from '../services';
import type { ApiResponse } from '../../../shared/types/common';

export function useDeleteCampaign() {
  const [isLoading, setIsLoading] = useState(false);

  const remove = useCallback(async (id: string): Promise<ApiResponse<null> | null> => {
    setIsLoading(true);
    try {
      return await campaignApiService.delete(id);
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { remove, isLoading };
}
