import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types/checkoutNote.types';

interface UseCheckoutNoteActionsParams {
  checkout: {
    handleAddCheckoutNote: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleUpdateCheckoutNote: (id: number, values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleDeleteCheckoutNote: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: CheckoutNoteItem | null;
    closeDrawer: () => void;
  };
}

export function useCheckoutNoteActions({ checkout, drawer }: UseCheckoutNoteActionsParams) {
  const [deletingItem, setDeletingItem] = useState<CheckoutNoteItem | null>(null);

  const handleSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    helpers: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    const success = await checkout.handleAddCheckoutNote(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [checkout.handleAddCheckoutNote, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    helpers: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await checkout.handleUpdateCheckoutNote(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, checkout.handleUpdateCheckoutNote, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: CheckoutNoteItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await checkout.handleDeleteCheckoutNote(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, checkout.handleDeleteCheckoutNote]);

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
