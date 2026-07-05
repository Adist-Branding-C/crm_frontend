import { useState, useMemo, useCallback } from 'react';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types';

export function useCheckoutNoteDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CheckoutNoteItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: CheckoutNoteItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: CheckoutNoteFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          note: editingItem.note || '',
          status: editingItem.status || '',
        }
      : { title: '', note: '', status: '' },
    [editingItem]
  );

  return {
    showDrawer,
    editingItem,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    drawerInitialValues,
  };
}
