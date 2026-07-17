import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { DealTaskItem } from '../types/index';
import type { UseDealTaskDeleteConfirmParams } from '../types/useDealTaskDeleteConfirm.types';

export function useDealTaskDeleteConfirm({ handleDeleteDealTask }: UseDealTaskDeleteConfirmParams) {
  const deleteDealTask = useCallback((item: DealTaskItem) => handleDeleteDealTask(item.id), [handleDeleteDealTask]);

  return useDeleteConfirmation<DealTaskItem>(deleteDealTask);
}
