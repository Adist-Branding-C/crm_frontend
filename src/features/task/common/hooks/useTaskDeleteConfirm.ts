import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';

/**
 * Delete-confirmation modal state for a task-type entity: wraps the item-level
 * delete handler with the id extraction every task list's delete flow needs.
 *
 * Used by:
 * - useTaskDeleteConfirm (task), useCallTaskDeleteConfirm, useCampaignTaskDeleteConfirm,
 *   useDealTaskDeleteConfirm - each passes its own entity's delete-by-id handler.
 *
 * Notes:
 * - Previously each of the four sub-modules reimplemented this exact
 *   "adapt useDeleteConfirmation to a delete-by-id handler" one-liner.
 */
export function useTaskDeleteConfirm<TItem extends { id: number }>(handleDelete: (id: number) => Promise<boolean>) {
  const deleteItem = useCallback((item: TItem) => handleDelete(item.id), [handleDelete]);
  return useDeleteConfirmation<TItem>(deleteItem);
}
