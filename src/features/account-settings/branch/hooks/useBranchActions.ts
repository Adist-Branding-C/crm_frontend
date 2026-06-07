import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { BranchItem, BranchFormData } from '../types/branch.types';
import type { UseBranchActionsParams } from '../types/use-branch-actions.types';

export function useBranchActions({ branch, drawer }: UseBranchActionsParams) {
  const [deletingItem, setDeletingItem] = useState<BranchItem | null>(null);

  const handleSubmit = useCallback(async (
    values: BranchFormData,
    helpers: FormikHelpers<BranchFormData>,
  ) => {
    const success = await branch.handleAddBranch(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [branch.handleAddBranch, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: BranchFormData,
    helpers: FormikHelpers<BranchFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await branch.handleUpdateBranch(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, branch.handleUpdateBranch, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: BranchItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await branch.handleDeleteBranch(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, branch.handleDeleteBranch]);

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
