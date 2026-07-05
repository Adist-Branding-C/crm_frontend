import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { CheckoutNoteItem, CheckoutNoteFormData, UseCheckoutNoteActionsParams } from '../types';

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
    const item = drawer.editingItem;
    const original: CheckoutNoteFormData = {
      title: item.title || '',
      note: item.note || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await checkoutNote.handleUpdateCheckoutNote(item.id, values, helpers);
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
