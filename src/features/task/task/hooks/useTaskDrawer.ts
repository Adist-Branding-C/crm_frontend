import { useState, useMemo, useCallback } from 'react';
import type { TaskItem, TaskFormData } from '../types/task.types';

export function useTaskDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<TaskItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowAddDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: TaskItem) => {
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

  const drawerInitialValues: TaskFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          description: editingItem.description || '',
          category: editingItem.category || '',
          deal: editingItem.deal || '',
          dealId: editingItem.dealId || '',
          amount: editingItem.amount ? String(editingItem.amount) : '',
          scheduledDate: editingItem.scheduledDate || '',
          scheduledTime: editingItem.scheduledTime || '',
          assignedTo: editingItem.assignedTo || '',
          priority: editingItem.priority || '',
          status: editingItem.status || '',
        }
      : {
          title: '',
          description: '',
          category: '',
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
