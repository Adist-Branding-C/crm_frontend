import { useState, useMemo, useCallback } from 'react';
import type { AgentItem, AgentFormData } from '../types';
import { ADD_AGENT_INITIAL_VALUES } from '../constants';

export function useEditAgentDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<AgentItem | null>(null);

  const openEditDrawer = useCallback((item: AgentItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: AgentFormData = useMemo(
    () => editingItem
      ? {
          fullName: editingItem.fullName || editingItem.name || '',
          email: editingItem.email || '',
          phone: editingItem.phone || editingItem.phone_number || editingItem.phoneNumber || editingItem.mobile || '',
          password: '',
          confirmPassword: '',
          designationId: String(editingItem.designationId ?? editingItem.designation_id ?? editingItem.designation?.id ?? ''),
          departmentId: String(editingItem.departmentId ?? editingItem.department_id ?? editingItem.department?.id ?? ''),
          status: editingItem.status || '',
        }
      : ADD_AGENT_INITIAL_VALUES,
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
