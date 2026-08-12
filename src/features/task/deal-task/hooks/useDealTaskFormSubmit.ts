import { useTaskFormSubmit } from '../../common/hooks/useTaskFormSubmit';
import { DealTaskMapper } from '../mapper/dealTaskMapper';
import type { UseDealTaskFormSubmitParams } from '../types/hook.types';

export function useDealTaskFormSubmit({ editingItem, closeDrawer, handleAddDealTask, handleUpdateDealTask }: UseDealTaskFormSubmitParams) {
  return useTaskFormSubmit({
    editingItem,
    closeDrawer,
    mapItemToFormData: DealTaskMapper.toFormValues,
    handleAdd: handleAddDealTask,
    handleUpdate: handleUpdateDealTask,
  });
}
