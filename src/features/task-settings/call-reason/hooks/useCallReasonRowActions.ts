import { useRowActions } from '../../../../shared/hooks/useRowActions';
import type { CallReasonItem, UseCallReasonRowActionsParams } from '../types/index';

/**
 * Composes the call-reason row actions: opening the edit drawer or the delete-confirm dialog
 * must also close the open row dropdown, in the same user action. Delegates the actual
 * composition to the shared, entity-generic useRowActions hook.
 */
export function useCallReasonRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseCallReasonRowActionsParams) {
  return useRowActions<CallReasonItem>({ onEdit: openEditDrawer, onDelete: onDeleteClick, closeDropdown });
}
