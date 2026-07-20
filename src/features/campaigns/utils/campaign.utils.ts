import type { CreatedByDisplay, PoolAgentInfo } from '../types/interface';

/**
 * Formats the campaign's createdBy field for display; the backend sends either a plain string
 * or a CreatedByInfo object, so this is the one place that fallback lives.
 *
 * Used by:
 * - CampaignRow, CAMPAIGN_CSV_COLUMNS
 */
export function getCreatedByLabel(createdBy: CreatedByDisplay): string {
  if (!createdBy) return '-';
  if (typeof createdBy === 'string') return createdBy;
  return createdBy.name || createdBy.agentId || String(createdBy.id ?? '') || '-';
}

/**
 * Formats a Data Pool campaign's assigned agents as a comma-separated display label.
 *
 * Used by:
 * - CampaignRow, CAMPAIGN_CSV_COLUMNS
 */
export function getPoolAgentsLabel(poolAgents: PoolAgentInfo[] | undefined): string {
  if (!poolAgents || poolAgents.length === 0) return '-';
  return poolAgents.map((agent) => agent.name || agent.agentId || '-').join(', ');
}

/**
 * Converts a zero-based row index into a page-relative serial number.
 *
 * Used by:
 * - CampaignMapper.toEntityList
 */
export function computeSlNo(index: number, currentPage: number, rowsPerPage: number): number {
  return (currentPage - 1) * rowsPerPage + index + 1;
}

/**
 * Derives the CSS badge class for a campaign's type value (e.g. "Lead Campaign" ->
 * "badge badge-lead-campaign").
 *
 * Used by:
 * - CampaignRow
 */
export function getCampaignTypeBadgeClass(type: string): string {
  return `badge badge-${type.toLowerCase().replace(/ /g, '-')}`;
}
