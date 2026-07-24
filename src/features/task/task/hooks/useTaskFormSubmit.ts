import { useTaskFormSubmit as useTaskFormSubmitCore } from '../../common/hooks/useTaskFormSubmit';
import { TaskMapper } from '../mapper/taskMapper';
import type { UseTaskFormSubmitParams } from '../types/hook.types';

export function useTaskFormSubmit({ editingItem, closeDrawer, handleAddTask, handleUpdateTask }: UseTaskFormSubmitParams) {
  return useTaskFormSubmitCore({
    editingItem,
    closeDrawer,
    mapItemToFormData: TaskMapper.toFormValues,
    handleAdd: handleAddTask,
    handleUpdate: handleUpdateTask,
  });
}
