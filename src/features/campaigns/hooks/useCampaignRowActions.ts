import { useRowActions } from '../../../shared/hooks/useRowActions';
import type { Campaign, UseCampaignRowActionsParams } from '../types/index';

/**
 * Composes the campaign row's edit/delete actions: opening the edit drawer or the delete-confirm
 * dialog must also close the open row dropdown, in the same user action. Delegates the actual
 * composition to the shared, entity-generic useRowActions hook.
 *
 * Notes:
 * - View and Assign are handled directly on the page rather than through this hook, since they
 *   are not backed by shared row-action primitives (both are currently unimplemented stubs).
 */
export function useCampaignRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseCampaignRowActionsParams) {
  return useRowActions<Campaign>({ onEdit: openEditDrawer, onDelete: onDeleteClick, closeDropdown });
}
