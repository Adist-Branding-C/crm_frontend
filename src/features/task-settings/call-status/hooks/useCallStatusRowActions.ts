import { useRowActions } from '../../../../shared/hooks/useRowActions';
import type { CallStatusItem, UseCallStatusRowActionsParams } from '../types/index';

/**
 * Composes the call-status row actions: opening the edit drawer or the delete-confirm dialog
 * must also close the open row dropdown, in the same user action. Delegates the actual
 * composition to the shared, entity-generic useRowActions hook.
 */
export function useCallStatusRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseCallStatusRowActionsParams) {
  return useRowActions<CallStatusItem>({ onEdit: openEditDrawer, onDelete: onDeleteClick, closeDropdown });
}
