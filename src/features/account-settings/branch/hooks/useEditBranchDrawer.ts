import { useState, useMemo, useCallback } from 'react';
import type { BranchItem, BranchFormData } from '../types';
import { ADD_BRANCH_INITIAL_VALUES } from '../constants';

export function useEditBranchDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<BranchItem | null>(null);

  const openEditDrawer = useCallback((item: BranchItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: BranchFormData = useMemo(
    () => editingItem
      ? {
          name: editingItem.name || editingItem.branchName || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : ADD_BRANCH_INITIAL_VALUES,
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
