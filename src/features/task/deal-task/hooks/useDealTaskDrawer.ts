import { useState, useMemo, useCallback } from 'react';
import type { DealTaskItem, DealTaskFormData } from '../types/dealTask.types';

export function useDealTaskDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DealTaskItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowAddDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DealTaskItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
    setEditingItem(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setEditingItem(null);
  }, []);

  const drawerInitialValues: DealTaskFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          description: editingItem.description || '',
          deal: typeof editingItem.deal === 'string' ? editingItem.deal : editingItem.deal?.name || '',
          dealId: editingItem.dealId || '',
          amount: editingItem.amount ? String(editingItem.amount) : '',
          scheduledDate: editingItem.scheduledDate || '',
          scheduledTime: editingItem.scheduledTime || '',
          assignedTo: typeof editingItem.assignedTo === 'string' ? editingItem.assignedTo : editingItem.assignedTo?.name || '',
          priority: editingItem.priority || '',
          status: editingItem.status || '',
        }
      : {
          title: '',
          description: '',
          deal: '',
          dealId: '',
          amount: '',
          scheduledDate: '',
          scheduledTime: '',
          assignedTo: '',
          priority: '',
          status: '',
        },
    [editingItem]
  );

  return {
    showAddDrawer,
    showEditDrawer,
    editingItem,
    openAddDrawer,
    openEditDrawer,
    closeAddDrawer,
    closeEditDrawer,
    closeDeleteDialog,
    drawerInitialValues,
  };
}
