import { useState, useMemo, useCallback } from 'react';
import type { DesignationItem, DesignationFormData } from '../types';

export function useDesignationDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DesignationItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DesignationItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: DesignationFormData = useMemo(
    () => editingItem
      ? {
          designationName: editingItem.designationName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : { designationName: '', description: '', status: '' },
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
