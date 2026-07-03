import { useState, useMemo, useCallback } from 'react';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/campaignTask.types';

export function useCampaignTaskDrawer() {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<CampaignTaskItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowAddDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: CampaignTaskItem) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeAddDrawer = useCallback(() => {
    setShowAddDrawer(false);
    setEditingItem(null);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setEditingItem(null);
  }, []);

  const drawerInitialValues: CampaignTaskFormData = useMemo(
    () => editingItem
      ? {
          title: editingItem.title || '',
          description: editingItem.description || '',
          campaignName: editingItem.campaignName || '',
          campaignType: editingItem.campaignType || '',
          scheduledDate: editingItem.scheduledDate || '',
          scheduledTime: editingItem.scheduledTime || '',
          assignedTo: typeof editingItem.assignedTo === 'string' ? editingItem.assignedTo : editingItem.assignedTo?.name || '',
          status: editingItem.status || '',
        }
      : {
          title: '',
          description: '',
          campaignName: '',
          campaignType: '',
          scheduledDate: '',
          scheduledTime: '',
          assignedTo: '',
          status: '',
        },
    [editingItem]
  );

  return {
    showAddDrawer,
    showEditDrawer,
    editingItem,
    openAddDrawer,
    openEditDrawer,
    closeAddDrawer,
    closeEditDrawer,
    closeDeleteDialog,
    drawerInitialValues,
  };
}
