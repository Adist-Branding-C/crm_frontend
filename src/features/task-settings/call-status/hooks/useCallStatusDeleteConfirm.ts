import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CallStatusItem } from '../types/index';

/**
 * Delete-confirmation modal state for call statuses.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation.
 */
export function useCallStatusDeleteConfirm(handleDeleteCallStatus: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<CallStatusItem>((item) => handleDeleteCallStatus(item.id));
}
