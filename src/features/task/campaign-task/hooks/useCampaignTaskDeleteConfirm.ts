import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CampaignTaskItem } from '../types/index';
import type { UseCampaignTaskDeleteConfirmParams } from '../types/useCampaignTaskDeleteConfirm.types';

export function useCampaignTaskDeleteConfirm({ handleDeleteCampaignTask }: UseCampaignTaskDeleteConfirmParams) {
  const deleteCampaignTask = useCallback((item: CampaignTaskItem) => handleDeleteCampaignTask(item.id), [handleDeleteCampaignTask]);

  return useDeleteConfirmation<CampaignTaskItem>(deleteCampaignTask);
}
