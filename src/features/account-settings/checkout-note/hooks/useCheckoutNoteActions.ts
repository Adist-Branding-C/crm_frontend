import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types/checkoutNote.types';
import type { UseCheckoutNoteActionsParams } from '../types/use-checkout-note-actions.types';

export function useCheckoutNoteActions({ checkoutNote, drawer }: UseCheckoutNoteActionsParams) {
  const [deletingItem, setDeletingItem] = useState<CheckoutNoteItem | null>(null);

  const handleSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    helpers: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    const success = await checkoutNote.handleAddCheckoutNote(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [checkoutNote.handleAddCheckoutNote, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    helpers: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await checkoutNote.handleUpdateCheckoutNote(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, checkoutNote.handleUpdateCheckoutNote, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: CheckoutNoteItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await checkoutNote.handleDeleteCheckoutNote(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, checkoutNote.handleDeleteCheckoutNote]);

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
