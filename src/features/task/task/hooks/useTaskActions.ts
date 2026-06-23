import { useState, useCallback } from 'react';
import type { TaskItem, TaskFormData } from '../types/task.types';
import type { UseTaskActionsParams } from '../types/use-task-actions.types';

export function useTaskActions({ task, drawer }: UseTaskActionsParams) {
  const [deletingItem, setDeletingItem] = useState<TaskItem | null>(null);

  const handleSubmit = useCallback(async (values: TaskFormData) => {
    const success = await task.handleAdd(values);
    if (success) {
      drawer.closeAddDrawer();
    }
  }, [task.handleAdd, drawer.closeAddDrawer]);

  const handleEditSubmit = useCallback(async (values: TaskFormData) => {
    if (!drawer.editingItem) return;
    const success = await task.handleUpdate(drawer.editingItem.id, values);
    if (success) {
      drawer.closeEditDrawer();
    }
  }, [drawer.editingItem, task.handleUpdate, drawer.closeEditDrawer]);

  const handleDeleteClick = useCallback((item: TaskItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await task.handleDelete(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, task.handleDelete]);

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
