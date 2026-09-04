import { useState, useMemo, useCallback } from 'react';
import { buildRoleInitialValues } from '../utils/roleFormData.util';
import { ADD_ROLE_INITIAL_VALUES } from '../constants/role.constants';
import type { RoleItem, RoleFormData } from '../types/role.types';

export function useRoleDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<RoleItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: RoleItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: RoleFormData = useMemo(
    () => (editingItem ? buildRoleInitialValues(editingItem) : ADD_ROLE_INITIAL_VALUES),
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
