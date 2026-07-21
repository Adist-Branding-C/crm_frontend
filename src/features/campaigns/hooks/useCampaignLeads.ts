import { useCallback, useEffect, useState } from 'react';
import { campaignLeadsApiService } from '../services';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { CampaignLeadItem } from '../types/campaign-lead';
import type { CampaignLeadStatus } from '../../../shared/constants/enums';

export function useCampaignLeads(campaignId: string | null) {
  const [leads, setLeads] = useState<CampaignLeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!campaignId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await campaignLeadsApiService.getForCampaign(campaignId);
      setLeads(response.data ?? []);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      refresh();
    } else {
      setLeads([]);
      setError(null);
    }
  }, [campaignId, refresh]);

  const updateStatus = useCallback(async (leadId: string, status: CampaignLeadStatus) => {
    if (!campaignId) return;
    setError(null);
    try {
      const response = await campaignLeadsApiService.updateLeadStatus(campaignId, leadId, status);
      if (response.status) {
        setLeads((prev) => prev.map((item) => (String(item.leadId) === leadId ? { ...item, status } : item)));
      } else {
        setError(response.message || 'Failed to update lead status');
      }
    } catch (err) {
      setError(parseApiError(err).message);
    }
  }, [campaignId]);

  const removeLead = useCallback(async (leadId: string): Promise<boolean> => {
    if (!campaignId) return false;
    setError(null);
    try {
      const response = await campaignLeadsApiService.removeLead(campaignId, leadId);
      if (response.status) {
        setLeads((prev) => prev.filter((item) => String(item.leadId) !== leadId));
        return true;
      }
      setError(response.message || 'Failed to remove lead');
      return false;
    } catch (err) {
      setError(parseApiError(err).message);
      return false;
    }
  }, [campaignId]);

  return { leads, isLoading, error, refresh, updateStatus, removeLead };
}
