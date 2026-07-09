import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { TaskItem } from '../types';
import type { UseTaskDeleteConfirmParams } from '../types';

export function useTaskDeleteConfirm({ handleDeleteTask }: UseTaskDeleteConfirmParams) {
  const deleteTask = useCallback((item: TaskItem) => handleDeleteTask(item.id), [handleDeleteTask]);
  return useDeleteConfirmation<TaskItem>(deleteTask);
}
