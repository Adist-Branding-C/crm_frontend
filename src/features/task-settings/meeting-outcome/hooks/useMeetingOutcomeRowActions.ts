import { useRowActions } from '../../../../shared/hooks/useRowActions';
import type { MeetingOutcomeItem, UseMeetingOutcomeRowActionsParams } from '../types/index';

/**
 * Composes the meeting-outcome row actions: opening the edit drawer or the delete-confirm dialog
 * must also close the open row dropdown, in the same user action. Delegates the actual
 * composition to the shared, entity-generic useRowActions hook.
 */
export function useMeetingOutcomeRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseMeetingOutcomeRowActionsParams) {
  return useRowActions<MeetingOutcomeItem>({ onEdit: openEditDrawer, onDelete: onDeleteClick, closeDropdown });
}
