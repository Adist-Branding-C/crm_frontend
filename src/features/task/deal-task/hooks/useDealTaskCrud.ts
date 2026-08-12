import { useTaskCrud } from '../../common/hooks/useTaskCrud';
import { dealTaskDataService } from '../services/dealTaskDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { UseDealTaskCrudParams } from '../types/hook.types';

export function useDealTaskCrud({ pagination, showToastMessage }: UseDealTaskCrudParams) {
  const crud = useTaskCrud({
    pagination,
    showToastMessage,
    dataService: dealTaskDataService,
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
    handleAddDealTask: crud.handleAdd,
    handleUpdateDealTask: crud.handleUpdate,
    handleDeleteDealTask: crud.handleDelete,
  };
}
