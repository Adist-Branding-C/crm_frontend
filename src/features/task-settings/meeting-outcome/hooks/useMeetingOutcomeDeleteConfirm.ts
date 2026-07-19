import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { MeetingOutcomeItem } from '../types/index';

/**
 * Thin wrapper around the shared useDeleteConfirmation, scoped to meeting-outcome items.
 */
export function useMeetingOutcomeDeleteConfirm(handleDeleteMeetingOutcome: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<MeetingOutcomeItem>((item) => handleDeleteMeetingOutcome(item.id));
}
