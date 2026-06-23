import { useState, useCallback } from 'react';
import { campaignService } from '../services/campaign.service';
import { generateCampaignCsv } from '../utils/csv.utils';
import type { Campaign } from '../types/campaign.types';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types/campaign.types';
import type { UseCampaignActionsParams } from '../types/use-campaign-actions.types';

export function useCampaignActions({
  campaign,
  drawer,
  filters,
  buildParams,
}: UseCampaignActionsParams) {
  const [deletingItem, setDeletingItem] = useState<Campaign | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = useCallback((msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await campaignService.delete(String(id));
    } catch {
    }
    campaign.setCampaigns(prev => prev.filter(c => c.id !== id));
    filters.setActionMenuOpen(null);
  }, [campaign.setCampaigns, filters.setActionMenuOpen]);

  const handleExport = useCallback(async () => {
    try {
      const res = await campaignService.export();
      const blob = res.data as Blob;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'campaigns.csv';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch {
      generateCampaignCsv(campaign.campaigns);
    }
  }, [campaign.campaigns]);

  const handleSubmit = useCallback(async () => {
    if (!drawer.validate()) return;
    const payload: CreateCampaignPayload = drawer.buildPayload();
    try {
      if (drawer.mode === 'edit' && drawer.editingCampaign) {
        await campaignService.update(String(drawer.editingCampaign.id), payload as UpdateCampaignPayload);
      } else {
        await campaignService.create(payload);
      }
      showSuccess(drawer.mode === 'edit' ? 'Campaign updated successfully' : 'Campaign created successfully');
      drawer.close();
      await campaign.fetchCampaigns(buildParams());
    } catch {
    }
  }, [drawer, campaign.fetchCampaigns, buildParams, showSuccess]);

  const handleDeleteClick = useCallback((item: Campaign) => {
    setDeletingItem(item);
    filters.setActionMenuOpen(null);
  }, [filters.setActionMenuOpen]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    await handleDelete(deletingItem.id);
    setDeletingItem(null);
  }, [deletingItem, handleDelete]);

  const closeDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  return {
    deletingItem,
    handleDelete,
    handleExport,
    handleSubmit,
    successMessage,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal,
  };
}
