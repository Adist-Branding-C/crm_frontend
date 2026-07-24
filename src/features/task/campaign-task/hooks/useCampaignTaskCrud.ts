import { useTaskCrud } from '../../common/hooks/useTaskCrud';
import { campaignTaskDataService } from '../services/campaignTaskDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { UseCampaignTaskCrudParams } from '../types/hook.types';

export function useCampaignTaskCrud({ pagination, showToastMessage }: UseCampaignTaskCrudParams) {
  const crud = useTaskCrud({
    pagination,
    showToastMessage,
    dataService: campaignTaskDataService,
    messages: {
      added: SUCCESS_MESSAGES.ADDED,
      updated: SUCCESS_MESSAGES.UPDATED,
      deleted: SUCCESS_MESSAGES.DELETED,
      addFailed: ERROR_MESSAGES.ADD_FAILED,
      updateFailed: ERROR_MESSAGES.UPDATE_FAILED,
      deleteFailed: ERROR_MESSAGES.DELETE_FAILED,
    },
  });

  return {
    handleAddCampaignTask: crud.handleAdd,
    handleUpdateCampaignTask: crud.handleUpdate,
    handleDeleteCampaignTask: crud.handleDelete,
  };
}
