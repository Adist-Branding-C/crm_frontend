import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { DesignationItem, DesignationFormData } from '../types/designation.types';
import type { UseDesignationActionsParams } from '../types/use-designation-actions.types';

export function useDesignationActions({ designation, drawer }: UseDesignationActionsParams) {
  const [deletingItem, setDeletingItem] = useState<DesignationItem | null>(null);

  const handleSubmit = useCallback(async (
    values: DesignationFormData,
    helpers: FormikHelpers<DesignationFormData>,
  ) => {
    const success = await designation.handleAddDesignation(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [designation.handleAddDesignation, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: DesignationFormData,
    helpers: FormikHelpers<DesignationFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await designation.handleUpdateDesignation(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, designation.handleUpdateDesignation, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: DesignationItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await designation.handleDeleteDesignation(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, designation.handleDeleteDesignation]);

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
