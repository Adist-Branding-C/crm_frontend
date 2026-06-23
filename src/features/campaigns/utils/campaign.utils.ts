import { CAMPAIGN_TYPES } from '../constants/campaign.constants';
import type { CampaignFormData, CreateCampaignPayload } from '../types/campaign.types';

export function computeSlNo(index: number, currentPage: number, rowsPerPage: number): number {
  return (currentPage - 1) * rowsPerPage + index + 1;
}

export function getBadgeClass(type: string): string {
  return `badge badge-${type.toLowerCase().replace(/ /g, '-')}`;
}

export const SPECIAL_KEYS = ['name', 'type', 'completedPercent', 'createdBy', 'createdAt', 'action'];

export function getCellValue(row: Record<string, unknown>, key: string, specialKeys: string[]): string {
  if (!specialKeys.includes(key) && key in row) return String(row[key] ?? '');
  return '';
}

export function buildCampaignPayload(formData: CampaignFormData): CreateCampaignPayload {
  if (formData.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN) {
    return {
      type: CAMPAIGN_TYPES.LEAD_CAMPAIGN,
      name: formData.name,
      ...(formData.description ? { description: formData.description } : {}),
      ...(formData.startDate ? { startDate: formData.startDate } : {}),
      ...(formData.endDate ? { endDate: formData.endDate } : {}),
    };
  }
  return {
    type: CAMPAIGN_TYPES.DATA_POOL,
    poolName: formData.poolName,
    poolAgents: formData.poolAgents,
    ...(formData.filterBy ? { filterBy: formData.filterBy } : {}),
    ...(formData.sortBy ? { sortBy: formData.sortBy } : {}),
  };
}
