import { useState, useMemo, useCallback } from 'react';
import type { BranchItem, BranchFormData } from '../types/branch.types';

export function useBranchDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<BranchItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: BranchItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: BranchFormData = useMemo(
    () => editingItem
      ? {
          name: editingItem.name || editingItem.branchName || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : { name: '', description: '', status: '' },
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
