import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { AgentItem, AgentFormData } from '../types/agent.types';

interface UseAgentActionsParams {
  agent: {
    handleAddAgent: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleUpdateAgent: (staffId: string, values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleDeleteAgent: (staffId: string) => Promise<boolean>;
  };
  drawer: {
    editingItem: AgentItem | null;
    closeDrawer: () => void;
  };
}

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
    const success = await agent.handleUpdateAgent(drawer.editingItem.staff_id, values, helpers);
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
