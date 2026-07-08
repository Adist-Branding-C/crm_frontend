import { useState, useMemo, useCallback } from 'react';
import type { Campaign, CampaignFormData } from '../types';
import { INITIAL_CAMPAIGN_FORM_DATA } from '../constants';

export function useEditCampaignDrawer() {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<Campaign | null>(null);

  const openEditDrawer = useCallback((item: Campaign) => {
    setEditingItem(item);
    setShowEditDrawer(true);
  }, []);

  const closeEditDrawer = useCallback(() => {
    setShowEditDrawer(false);
    setEditingItem(null);
  }, []);

  const editInitialValues: CampaignFormData = useMemo(
    () => editingItem
      ? {
          type: editingItem.type || '',
          name: editingItem.name || '',
          startDate: editingItem.startDate || '',
          endDate: editingItem.endDate || '',
          description: editingItem.description || '',
          poolName: editingItem.poolName || (editingItem.type === 'Data Pool' ? editingItem.name : '') || '',
          poolAgents: editingItem.poolAgents || [],
          agents: (editingItem.type === 'Lead Campaign' ? editingItem.agents : []) || [],
        }
      : INITIAL_CAMPAIGN_FORM_DATA,
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
