import { useCallback } from 'react';
import type { CallReasonItem, UseCallReasonRowActionsParams } from '../types/index';

/**
 * Composes the call-reason row actions: opening the edit drawer or the delete-confirm
 * dialog must also close the open row dropdown, in the same user action.
 *
 * Used by:
 * - CallReasonPage
 */
export function useCallReasonRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseCallReasonRowActionsParams) {
  const handleEditClick = useCallback((item: CallReasonItem) => {
    openEditDrawer(item);
    closeDropdown();
  }, [openEditDrawer, closeDropdown]);

  const handleDeleteClick = useCallback((item: CallReasonItem) => {
    onDeleteClick(item);
    closeDropdown();
  }, [onDeleteClick, closeDropdown]);

  return { handleEditClick, handleDeleteClick };
}
