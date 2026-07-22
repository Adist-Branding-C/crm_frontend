import { useState, useCallback } from 'react';

/**
 * Generic delete-confirmation modal state: which item is pending deletion, and confirm/cancel.
 *
 * Notes:
 * - Reusable across any feature's delete-confirm flow; pass a callback that performs the actual
 *   delete request and resolves to whether it succeeded. Previously reimplemented per-feature
 *   (account-settings/agent, designations, etc. each hand-rolled this inside a combined
 *   "actions" hook); this is the shared version.
 */
export function useDeleteConfirmation<TItem>(onDelete: (item: TItem) => Promise<boolean>) {
  const [deletingItem, setDeletingItem] = useState<TItem | null>(null);

  const handleDeleteClick = useCallback((item: TItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await onDelete(deletingItem);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, onDelete]);

  const closeDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  return { deletingItem, handleDeleteClick, handleConfirmDelete, closeDeleteModal };
}
