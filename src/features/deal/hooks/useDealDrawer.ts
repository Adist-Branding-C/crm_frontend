import { useState, useMemo, useCallback } from 'react';
import type { DealItem, DealFormData } from '../types';

export function useDealDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DealItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DealItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: DealFormData = useMemo(
    () => editingItem
      ? {
          dealName: editingItem.dealName || '',
          lead: editingItem.lead || '',
          mobile: editingItem.mobile || '',
          amount: String(editingItem.amount || ''),
          status: editingItem.status || '',
          type: editingItem.type || '',
          stage: editingItem.stage || '',
          priority: editingItem.priority || '',
          assignedTo: editingItem.assignedTo || '',
          startDate: editingItem.startDate || '',
          endDate: editingItem.endDate || '',
          notes: '',
        }
      : {
          dealName: '',
          lead: '',
          mobile: '',
          amount: '',
          status: '',
          type: '',
          stage: '',
          priority: '',
          assignedTo: '',
          startDate: '',
          endDate: '',
          notes: '',
        },
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
