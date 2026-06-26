import { useState, useMemo, useCallback } from 'react';
import type { AgentItem, AgentFormData } from '../types/agent.types';

export function useAgentDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<AgentItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: AgentItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: AgentFormData = useMemo(
    () => editingItem
      ? {
          fullName: editingItem.fullName || editingItem.name || '',
          email: editingItem.email || '',
          phone: editingItem.phone || editingItem.phone_number || editingItem.phoneNumber || editingItem.mobile || '',
          password: '',
          confirmPassword: '',
          designationId: editingItem.designationId || String(editingItem.designation_id ?? editingItem.designation ?? ''),
          status: editingItem.status || '',
        }
      : { fullName: '', email: '', phone: '', password: '', confirmPassword: '', designationId: '', status: '' },
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
