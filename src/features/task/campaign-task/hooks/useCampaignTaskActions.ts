import { useState, useCallback } from 'react';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/campaignTask.types';
import type { UseCampaignTaskActionsParams } from '../types/use-campaign-task-actions.types';

export function useCampaignTaskActions({ campaignTask, drawer }: UseCampaignTaskActionsParams) {
  const [deletingItem, setDeletingItem] = useState<CampaignTaskItem | null>(null);

  const handleSubmit = useCallback(async (values: CampaignTaskFormData) => {
    const success = await campaignTask.handleAdd(values);
    if (success) {
      drawer.closeAddDrawer();
    }
  }, [campaignTask.handleAdd, drawer.closeAddDrawer]);

  const handleEditSubmit = useCallback(async (values: CampaignTaskFormData) => {
    if (!drawer.editingItem) return;
    const success = await campaignTask.handleUpdate(drawer.editingItem.id, values);
    if (success) {
      drawer.closeEditDrawer();
    }
  }, [drawer.editingItem, campaignTask.handleUpdate, drawer.closeEditDrawer]);

  const handleDeleteClick = useCallback((item: CampaignTaskItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await campaignTask.handleDelete(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, campaignTask.handleDelete]);

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
