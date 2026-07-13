import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CallTaskItem } from '../types/index';
import type { UseCallTaskDeleteConfirmParams } from '../types/useCallTaskDeleteConfirm.types';

export function useCallTaskDeleteConfirm({ handleDeleteCallTask }: UseCallTaskDeleteConfirmParams) {
  const deleteCallTask = useCallback((item: CallTaskItem) => handleDeleteCallTask(item.id), [handleDeleteCallTask]);

  return useDeleteConfirmation<CallTaskItem>(deleteCallTask);
}
