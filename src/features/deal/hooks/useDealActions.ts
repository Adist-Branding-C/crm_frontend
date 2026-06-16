import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { DealItem, DealFormData } from '../types';
import type { UseDealActionsParams } from '../types';

export function useDealActions({ deal, drawer }: UseDealActionsParams) {
  const [deletingItem, setDeletingItem] = useState<DealItem | null>(null);

  const handleSubmit = useCallback(async (
    values: DealFormData,
    helpers: FormikHelpers<DealFormData>,
  ) => {
    const success = await deal.handleAddDeal(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [deal.handleAddDeal, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: DealFormData,
    helpers: FormikHelpers<DealFormData>,
  ) => {
    if (!drawer.editingItem || !drawer.editingItem.dealId) return;
    const success = await deal.handleUpdateDeal(drawer.editingItem.dealId, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, deal.handleUpdateDeal, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: DealItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem || !deletingItem.dealId) return;
    const success = await deal.handleDeleteDeal(deletingItem.dealId);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, deal.handleDeleteDeal]);

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
