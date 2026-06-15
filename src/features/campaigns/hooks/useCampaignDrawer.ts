import { useState, useCallback } from 'react';
import type { Campaign } from '../types/campaign.types';

export function useCampaignDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const openAdd = useCallback(() => {
    setEditingCampaign(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingCampaign(null);
  }, []);

  return {
    isOpen,
    editingCampaign,
    mode: editingCampaign ? 'edit' as const : 'add' as const,
    openAdd,
    openEdit,
    close,
  };
}
