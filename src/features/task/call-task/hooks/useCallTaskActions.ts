import { useState, useCallback } from 'react';
import type { CallTaskItem, CallTaskFormData } from '../types/callTask.types';
import type { UseCallTaskActionsParams } from '../types/use-call-task-actions.types';

export function useCallTaskActions({ callTask, drawer }: UseCallTaskActionsParams) {
  const [deletingItem, setDeletingItem] = useState<CallTaskItem | null>(null);

  const handleSubmit = useCallback(async (values: CallTaskFormData) => {
    const success = await callTask.handleAdd(values);
    if (success) {
      drawer.closeAddDrawer();
    }
  }, [callTask.handleAdd, drawer.closeAddDrawer]);

  const handleEditSubmit = useCallback(async (values: CallTaskFormData) => {
    if (!drawer.editingItem) return;
    const success = await callTask.handleUpdate(drawer.editingItem.id, values);
    if (success) {
      drawer.closeEditDrawer();
    }
  }, [drawer.editingItem, callTask.handleUpdate, drawer.closeEditDrawer]);

  const handleDeleteClick = useCallback((item: CallTaskItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await callTask.handleDelete(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, callTask.handleDelete]);

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
