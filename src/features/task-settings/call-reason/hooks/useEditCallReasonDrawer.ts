import { useState, useMemo, useCallback } from 'react';
import type { CallReasonItem, CallReasonFormData } from '../types/index';
import { ADD_CALL_REASON_INITIAL_VALUES } from '../constants/index';

export function useEditCallReasonDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CallReasonItem | null>(null);

  const openEditDrawer = useCallback((item: CallReasonItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: CallReasonFormData = useMemo(
    () => editingItem
      ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
      : ADD_CALL_REASON_INITIAL_VALUES,
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
