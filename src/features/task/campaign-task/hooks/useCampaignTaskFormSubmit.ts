import { useTaskFormSubmit } from '../../common/hooks/useTaskFormSubmit';
import { CampaignTaskMapper } from '../mapper/campaignTaskMapper';
import type { UseCampaignTaskFormSubmitParams } from '../types/hook.types';

export function useCampaignTaskFormSubmit({ editingItem, closeDrawer, handleAddCampaignTask, handleUpdateCampaignTask }: UseCampaignTaskFormSubmitParams) {
  return useTaskFormSubmit({
    editingItem,
    closeDrawer,
    mapItemToFormData: CampaignTaskMapper.toFormValues,
    handleAdd: handleAddCampaignTask,
    handleUpdate: handleUpdateCampaignTask,
  });
}
