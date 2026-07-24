import { useTaskDeleteConfirm } from '../../common/hooks/useTaskDeleteConfirm';
import type { CallTaskItem } from '../types/index';
import type { UseCallTaskDeleteConfirmParams } from '../types/hook.types';

export function useCallTaskDeleteConfirm({ handleDeleteCallTask }: UseCallTaskDeleteConfirmParams) {
  return useTaskDeleteConfirm<CallTaskItem>(handleDeleteCallTask);
}
