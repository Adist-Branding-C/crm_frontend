import { useState, useMemo, useCallback } from 'react';
import type { DealTaskItem, DealTaskFormData } from '../types/index';

export function useEditDealTaskDrawer(onOpen?: () => void) {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DealTaskItem | null>(null);

  const openEditDrawer = useCallback((item: DealTaskItem) => {
    onOpen?.();
    setEditingItem(item);
    setShowEditDrawer(true);
  }, [onOpen]);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: DealTaskFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          description: editingItem.description || '',
          scheduledDate: editingItem.scheduledDate || '',
          scheduledTime: editingItem.scheduledTime || '',
          assignedTo: editingItem.assignedTo || '',
          leadId: editingItem.leadId || '',
          priority: editingItem.priority || '',
          status: editingItem.status || '',
        }
      : {
          title: '',
          description: '',
          scheduledDate: '',
          scheduledTime: '',
          assignedTo: '',
          leadId: '',
          priority: '',
          status: '',
        },
    [editingItem]
  );

  return {
    showEditDrawer,
    editingItem,
    openEditDrawer,
    closeEditDrawer,
    editInitialValues,
  };
}