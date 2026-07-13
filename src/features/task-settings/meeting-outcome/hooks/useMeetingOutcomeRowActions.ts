import { useCallback } from 'react';
import type { MeetingOutcomeItem, UseMeetingOutcomeRowActionsParams } from '../types/index';

/**
 * Composes the meeting-outcome row actions: opening the edit drawer or the
 * delete-confirm dialog must also close the open row dropdown, in the same user action.
 *
 * Used by:
 * - MeetingOutcomePage
 */
export function useMeetingOutcomeRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseMeetingOutcomeRowActionsParams) {
  const handleEditClick = useCallback((item: MeetingOutcomeItem) => {
    openEditDrawer(item);
    closeDropdown();
  }, [openEditDrawer, closeDropdown]);

  const handleDeleteClick = useCallback((item: MeetingOutcomeItem) => {
    onDeleteClick(item);
    closeDropdown();
  }, [onDeleteClick, closeDropdown]);

  return { handleEditClick, handleDeleteClick };
}
