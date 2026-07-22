import type { CreatedByDisplay, PoolAgentInfo } from '../types/interface';

export function getCreatedByLabel(createdBy: CreatedByDisplay): string {
  if (!createdBy) return '-';
  if (typeof createdBy === 'string') return createdBy;
  return createdBy.name || createdBy.agentId || String(createdBy.id ?? '') || '-';
}

export function getPoolAgentsLabel(poolAgents: PoolAgentInfo[] | undefined): string {
  if (!poolAgents || poolAgents.length === 0) return '-';
  return poolAgents.map((agent) => agent.name || agent.agentId || '-').join(', ');
}

export function computeSlNo(index: number, currentPage: number, rowsPerPage: number): number {
  return (currentPage - 1) * rowsPerPage + index + 1;
}

export function getCampaignTypeBadgeClass(type: string): string {
  return `badge badge-${type.toLowerCase().replace(/ /g, '-')}`;
}
