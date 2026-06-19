import type { SpotlightLeadApi } from '../types';
import type { SpotlightFilterOptions } from '../types';

export function buildFilterOptions(items: SpotlightLeadApi[]): SpotlightFilterOptions {
  const uniqueTypes = new Map<number, string>();
  const uniqueSources = new Map<number, string>();
  const uniquePurposes = new Map<number, string>();
  const uniqueStatuses = new Map<number, string>();
  const uniqueAgents = new Map<string, string>();

  items.forEach(item => {
    uniqueTypes.set(item.typeId, item.type);
    uniqueSources.set(item.sourceId, item.source);
    uniquePurposes.set(item.purposeId, item.purpose);
    uniqueStatuses.set(item.statusId, item.status);
    if (item.agentId) uniqueAgents.set(item.agentId, item.agentName);
  });

  return {
    leadTypes: Array.from(uniqueTypes, ([v, l]) => ({ value: String(v), label: l })),
    sources: Array.from(uniqueSources, ([v, l]) => ({ value: String(v), label: l })),
    purposes: Array.from(uniquePurposes, ([v, l]) => ({ value: String(v), label: l })),
    statuses: Array.from(uniqueStatuses, ([v, l]) => ({ value: String(v), label: l })),
    agents: Array.from(uniqueAgents, ([v, l]) => ({ value: v, label: l })),
  };
}
