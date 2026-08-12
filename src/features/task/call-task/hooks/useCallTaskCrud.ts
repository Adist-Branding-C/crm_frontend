import { useTaskCrud } from '../../common/hooks/useTaskCrud';
import { callTaskDataService } from '../services/callTaskDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { UseCallTaskCrudParams } from '../types/hook.types';

export function useCallTaskCrud({ pagination, showToastMessage }: UseCallTaskCrudParams) {
  const crud = useTaskCrud({
    pagination,
    showToastMessage,
    dataService: callTaskDataService,
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
    handleAddCallTask: crud.handleAdd,
    handleUpdateCallTask: crud.handleUpdate,
    handleDeleteCallTask: crud.handleDelete,
  };
}
