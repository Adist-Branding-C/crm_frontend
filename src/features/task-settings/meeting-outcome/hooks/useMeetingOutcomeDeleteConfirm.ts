import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { MeetingOutcomeItem } from '../types/index';

/**
 * Delete-confirmation modal state for meeting outcomes.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation.
 */
export function useMeetingOutcomeDeleteConfirm(handleDeleteMeetingOutcome: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<MeetingOutcomeItem>((item) => handleDeleteMeetingOutcome(item.id));
}
