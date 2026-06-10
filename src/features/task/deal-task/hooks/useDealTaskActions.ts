import { useState, useCallback } from 'react';
import type { DealTaskItem, DealTaskFormData } from '../types/dealTask.types';
import type { UseDealTaskActionsParams } from '../types/use-deal-task-actions.types';

export function useDealTaskActions({ dealTask, drawer }: UseDealTaskActionsParams) {
  const [deletingItem, setDeletingItem] = useState<DealTaskItem | null>(null);

  const handleSubmit = useCallback(async (values: DealTaskFormData) => {
    const success = await dealTask.handleAdd(values);
    if (success) {
      drawer.closeAddDrawer();
    }
  }, [dealTask.handleAdd, drawer.closeAddDrawer]);

  const handleEditSubmit = useCallback(async (values: DealTaskFormData) => {
    if (!drawer.editingItem) return;
    const success = await dealTask.handleUpdate(drawer.editingItem.id, values);
    if (success) {
      drawer.closeEditDrawer();
    }
  }, [drawer.editingItem, dealTask.handleUpdate, drawer.closeEditDrawer]);

  const handleDeleteClick = useCallback((item: DealTaskItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await dealTask.handleDelete(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, dealTask.handleDelete]);

  const closeDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  return {
    deletingItem,
    handleSubmit,
    handleEditSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal,
  };
}
