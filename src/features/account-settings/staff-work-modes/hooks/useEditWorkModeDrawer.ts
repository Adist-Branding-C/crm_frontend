import { useState, useMemo, useCallback } from 'react';
import type { WorkModeItem, WorkModeFormData } from '../types';
import { ADD_WORK_MODE_INITIAL_VALUES } from '../constants';

export function useEditWorkModeDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkModeItem | null>(null);

  const openEditDrawer = useCallback((item: WorkModeItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: WorkModeFormData = useMemo(
    () => editingItem
      ? {
          workModeName: editingItem.workModeName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : ADD_WORK_MODE_INITIAL_VALUES,
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
