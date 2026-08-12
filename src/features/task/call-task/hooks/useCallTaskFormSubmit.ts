import { useTaskFormSubmit } from '../../common/hooks/useTaskFormSubmit';
import { CallTaskMapper } from '../mapper/callTaskMapper';
import type { UseCallTaskFormSubmitParams } from '../types/hook.types';

export function useCallTaskFormSubmit({ editingItem, closeDrawer, handleAddCallTask, handleUpdateCallTask }: UseCallTaskFormSubmitParams) {
  return useTaskFormSubmit({
    editingItem,
    closeDrawer,
    mapItemToFormData: CallTaskMapper.toFormValues,
    handleAdd: handleAddCallTask,
    handleUpdate: handleUpdateCallTask,
  });
}
