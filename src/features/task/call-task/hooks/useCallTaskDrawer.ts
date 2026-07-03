import { useState, useMemo, useCallback } from 'react';
import type { CallTaskItem, CallTaskFormData } from '../types/callTask.types';

export function useCallTaskDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CallTaskItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowAddDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: CallTaskItem) => {
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

  const drawerInitialValues: CallTaskFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          description: editingItem.description || '',
          contactName: editingItem.contactName || '',
          contactPhone: editingItem.contactPhone || '',
          scheduledDate: editingItem.scheduledDate || '',
          scheduledTime: editingItem.scheduledTime || '',
          duration: editingItem.duration || '',
          assignedTo: typeof editingItem.assignedTo === 'string' ? editingItem.assignedTo : editingItem.assignedTo?.name || '',
          status: editingItem.status || '',
        }
      : {
          title: '',
          description: '',
          contactName: '',
          contactPhone: '',
          scheduledDate: '',
          scheduledTime: '',
          duration: '',
          assignedTo: '',
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
