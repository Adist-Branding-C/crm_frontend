import { useTaskCrud as useTaskCrudCore } from '../../common/hooks/useTaskCrud';
import { taskDataService } from '../services/taskDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { UseTaskCrudParams } from '../types/hook.types';

export function useTaskCrud({ pagination, showToastMessage }: UseTaskCrudParams) {
  const crud = useTaskCrudCore({
    pagination,
    showToastMessage,
    dataService: taskDataService,
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
    handleAddTask: crud.handleAdd,
    handleUpdateTask: crud.handleUpdate,
    handleDeleteTask: crud.handleDelete,
  };
}
