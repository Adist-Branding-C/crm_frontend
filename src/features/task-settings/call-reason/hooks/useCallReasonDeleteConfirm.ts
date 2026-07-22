import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CallReasonItem } from '../types/index';

/**
 * Thin wrapper around the shared useDeleteConfirmation, scoped to call-reason items.
 */
export function useCallReasonDeleteConfirm(handleDeleteCallReason: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<CallReasonItem>((item) => handleDeleteCallReason(item.id));
}
