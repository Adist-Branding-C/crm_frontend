import { useState, useMemo, useCallback } from 'react';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types';
import { ADD_CHECKOUT_NOTE_INITIAL_VALUES } from '../constants';

export function useEditCheckoutNoteDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CheckoutNoteItem | null>(null);

  const openEditDrawer = useCallback((item: CheckoutNoteItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: CheckoutNoteFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          note: editingItem.note || '',
          status: editingItem.status || '',
        }
      : ADD_CHECKOUT_NOTE_INITIAL_VALUES,
    [editingItem],
  );

  return {
    showEditDrawer,
    editingItem,
    openEditDrawer,
    closeEditDrawer,
    editInitialValues,
  };
}
