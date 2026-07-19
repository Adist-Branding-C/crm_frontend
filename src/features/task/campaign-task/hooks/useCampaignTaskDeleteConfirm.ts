import { useTaskDeleteConfirm } from '../../common/hooks/useTaskDeleteConfirm';
import type { CampaignTaskItem } from '../types/index';
import type { UseCampaignTaskDeleteConfirmParams } from '../types/hook.types';

export function useCampaignTaskDeleteConfirm({ handleDeleteCampaignTask }: UseCampaignTaskDeleteConfirmParams) {
  return useTaskDeleteConfirm<CampaignTaskItem>(handleDeleteCampaignTask);
}
