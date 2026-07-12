import { useCallback } from 'react';
import type { CallStatusItem, UseCallStatusRowActionsParams } from '../types/index';

/**
 * Composes the call-status row actions: opening the edit drawer or the delete-confirm
 * dialog must also close the open row dropdown, in the same user action.
 *
 * Used by:
 * - CallStatusPage
 */
export function useCallStatusRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseCallStatusRowActionsParams) {
  const handleEditClick = useCallback((item: CallStatusItem) => {
    openEditDrawer(item);
    closeDropdown();
  }, [openEditDrawer, closeDropdown]);

  const handleDeleteClick = useCallback((item: CallStatusItem) => {
    onDeleteClick(item);
    closeDropdown();
  }, [onDeleteClick, closeDropdown]);

  return { handleEditClick, handleDeleteClick };
}
