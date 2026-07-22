import { useCallback } from 'react';

interface UseRowActionsParams<T> {
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  closeDropdown: () => void;
}

/**
 * Composes a table row's edit/delete click handlers with closing the row's action dropdown,
 * so a single user action that must update two hook-owned pieces of state together doesn't
 * need a chained handler written in the component body.
 *
 * Used by:
 * - deal-settings/status, deal-settings/type, deal-settings/additional-fields (DealXPage.tsx)
 *
 * Notes:
 * - Generic over the row item type; pass whichever hook-owned callbacks the page already has
 *   (e.g. drawer.openEditDrawer, deleteConfirm.handleDeleteClick, dropdown.closeDropdown).
 */
export function useRowActions<T>({ onEdit, onDelete, closeDropdown }: UseRowActionsParams<T>) {
  const handleEditClick = useCallback((item: T) => {
    onEdit(item);
    closeDropdown();
  }, [onEdit, closeDropdown]);

  const handleDeleteClick = useCallback((item: T) => {
    onDelete(item);
    closeDropdown();
  }, [onDelete, closeDropdown]);

  return { handleEditClick, handleDeleteClick };
}
