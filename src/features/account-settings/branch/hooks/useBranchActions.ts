import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { BranchItem, BranchFormData } from '../types/branch.types';

interface UseBranchActionsParams {
  agent: {
    handleAddBranch: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleUpdateBranch: (id: number, values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleDeleteBranch: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: BranchItem | null;
    closeDrawer: () => void;
  };
}

export function useBranchActions({ agent, drawer }: UseBranchActionsParams) {
  const [deletingItem, setDeletingItem] = useState<BranchItem | null>(null);

  const handleSubmit = useCallback(async (
    values: BranchFormData,
    helpers: FormikHelpers<BranchFormData>,
  ) => {
    const success = await agent.handleAddBranch(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [agent.handleAddBranch, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: BranchFormData,
    helpers: FormikHelpers<BranchFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await agent.handleUpdateBranch(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, agent.handleUpdateBranch, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: BranchItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await agent.handleDeleteBranch(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, agent.handleDeleteBranch]);

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
