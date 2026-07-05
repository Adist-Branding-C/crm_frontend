import { useState, useMemo, useCallback } from 'react';
import type { DesignationItem, DesignationFormData } from '../types';
import { ADD_DESIGNATION_INITIAL_VALUES } from '../constants';

export function useEditDesignationDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DesignationItem | null>(null);

  const openEditDrawer = useCallback((item: DesignationItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: DesignationFormData = useMemo(
    () => editingItem
      ? {
          designationName: editingItem.designationName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : ADD_DESIGNATION_INITIAL_VALUES,
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
