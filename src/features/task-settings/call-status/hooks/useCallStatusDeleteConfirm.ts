import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { CallStatusItem } from '../types/index';

/**
 * Thin wrapper around the shared useDeleteConfirmation, scoped to call-status items.
 */
export function useCallStatusDeleteConfirm(handleDeleteCallStatus: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<CallStatusItem>((item) => handleDeleteCallStatus(item.id));
}
