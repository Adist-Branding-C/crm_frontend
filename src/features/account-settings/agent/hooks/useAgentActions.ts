import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { AgentItem, AgentFormData } from '../types/agent.types';
import type { UseAgentActionsParams } from '../types/use-agent-actions.types';

export function useAgentActions({ agent, drawer }: UseAgentActionsParams) {
  const [deletingItem, setDeletingItem] = useState<AgentItem | null>(null);

  const handleSubmit = useCallback(async (
    values: AgentFormData,
    helpers: FormikHelpers<AgentFormData>,
  ) => {
    const success = await agent.handleAddAgent(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [agent.handleAddAgent, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: AgentFormData,
    helpers: FormikHelpers<AgentFormData>,
  ) => {
    if (!drawer.editingItem || !drawer.editingItem.staff_id) return;
    const item = drawer.editingItem;
    const original: AgentFormData = {
      fullName: item.fullName || item.name || '',
      email: item.email || '',
      phone: item.phone || item.phone_number || item.phoneNumber || item.mobile || '',
      password: '',
      confirmPassword: '',
      designationId: item.designationId || String(item.designation_id ?? item.designation ?? ''),
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await agent.handleUpdateAgent(item.staff_id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, agent.handleUpdateAgent, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: AgentItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem || !deletingItem.staff_id) return;
    const success = await agent.handleDeleteAgent(deletingItem.staff_id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, agent.handleDeleteAgent]);

  const closeDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  return {
    deletingItem,
    handleSubmit,
    handleEditSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal,
  };
}
