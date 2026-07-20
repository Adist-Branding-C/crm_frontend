import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { Campaign } from '../types/index';

/**
 * Thin wrapper around the shared useDeleteConfirmation, scoped to campaign items.
 */
export function useCampaignDeleteConfirm(handleDeleteCampaign: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<Campaign>((item) => handleDeleteCampaign(item.id));
}
