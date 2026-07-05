import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { WorkModeItem, WorkModeFormData, UseWorkModeActionsParams } from '../types';

export function useWorkModeActions({ workMode, drawer }: UseWorkModeActionsParams) {
  const [deletingItem, setDeletingItem] = useState<WorkModeItem | null>(null);

  const handleSubmit = useCallback(async (
    values: WorkModeFormData,
    helpers: FormikHelpers<WorkModeFormData>,
  ) => {
    const success = await workMode.handleAddWorkMode(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [workMode.handleAddWorkMode, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: WorkModeFormData,
    helpers: FormikHelpers<WorkModeFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await workMode.handleUpdateWorkMode(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, workMode.handleUpdateWorkMode, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: WorkModeItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await workMode.handleDeleteWorkMode(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, workMode.handleDeleteWorkMode]);

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
