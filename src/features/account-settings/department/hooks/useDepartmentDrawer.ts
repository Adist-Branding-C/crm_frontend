import { useState, useMemo, useCallback } from 'react';
import type { DepartmentItem, DepartmentFormData } from '../types/department.types';

export function useDepartmentDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DepartmentItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: DepartmentItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: DepartmentFormData = useMemo(
    () => editingItem
      ? {
          departmentName: editingItem.departmentName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : { departmentName: '', description: '', status: '' },
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
