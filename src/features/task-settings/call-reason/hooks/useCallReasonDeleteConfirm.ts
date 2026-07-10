import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CallReasonItem } from '../types/index';

/**
 * Delete-confirmation modal state for call reasons.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation.
 */
export function useCallReasonDeleteConfirm(handleDeleteCallReason: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<CallReasonItem>((item) => handleDeleteCallReason(item.id));
}
