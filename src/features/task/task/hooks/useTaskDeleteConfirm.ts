import { useTaskDeleteConfirm as useTaskDeleteConfirmCore } from '../../common/hooks/useTaskDeleteConfirm';
import type { TaskItem } from '../types';
import type { UseTaskDeleteConfirmParams } from '../types/hook.types';

export function useTaskDeleteConfirm({ handleDeleteTask }: UseTaskDeleteConfirmParams) {
  return useTaskDeleteConfirmCore<TaskItem>(handleDeleteTask);
}
