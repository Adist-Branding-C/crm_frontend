import { useTaskDeleteConfirm } from '../../common/hooks/useTaskDeleteConfirm';
import type { DealTaskItem } from '../types/index';
import type { UseDealTaskDeleteConfirmParams } from '../types/hook.types';

export function useDealTaskDeleteConfirm({ handleDeleteDealTask }: UseDealTaskDeleteConfirmParams) {
  return useTaskDeleteConfirm<DealTaskItem>(handleDeleteDealTask);
}
