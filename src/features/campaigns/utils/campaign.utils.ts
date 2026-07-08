import { CAMPAIGN_TYPES } from '../constants';
import type { CampaignFormData, CreateCampaignPayload, CreatedByDisplay } from '../types';

export function getCreatedByLabel(createdBy: CreatedByDisplay): string {
  if (!createdBy) return '-';
  if (typeof createdBy === 'string') return createdBy;
  return createdBy.name || createdBy.agentId || String(createdBy.id ?? '') || '-';
}

export function computeSlNo(index: number, currentPage: number, rowsPerPage: number): number {
  return (currentPage - 1) * rowsPerPage + index + 1;
}

export function buildCampaignPayload(formData: CampaignFormData): CreateCampaignPayload {
  if (formData.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN) {
    return {
      type: CAMPAIGN_TYPES.LEAD_CAMPAIGN,
      name: formData.name,
      ...(formData.description ? { description: formData.description } : {}),
      ...(formData.startDate ? { startDate: formData.startDate } : {}),
      ...(formData.endDate ? { endDate: formData.endDate } : {}),
      ...(formData.agents.length > 0 ? { agents: formData.agents } : {}),
    };
  }
  return {
    type: CAMPAIGN_TYPES.DATA_POOL,
    poolName: formData.poolName,
    poolAgents: formData.poolAgents,
  };
}
