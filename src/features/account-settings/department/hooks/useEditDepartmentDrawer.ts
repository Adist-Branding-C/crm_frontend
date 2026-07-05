import { useState, useMemo, useCallback } from 'react';
import type { DepartmentItem, DepartmentFormData } from '../types';
import { ADD_DEPARTMENT_INITIAL_VALUES } from '../constants';

export function useEditDepartmentDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<DepartmentItem | null>(null);

  const openEditDrawer = useCallback((item: DepartmentItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: DepartmentFormData = useMemo(
    () => editingItem
      ? {
          departmentName: editingItem.departmentName || editingItem.name || '',
          description: editingItem.description || '',
          status: editingItem.status || '',
        }
      : ADD_DEPARTMENT_INITIAL_VALUES,
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
