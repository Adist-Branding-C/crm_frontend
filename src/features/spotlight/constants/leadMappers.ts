import type { SpotlightLeadApi, SpotlightLead } from '../types';

export function mapApiLeadToDisplay(api: SpotlightLeadApi): SpotlightLead {
  return {
    id: api.id,
    name: api.name,
    phone: api.phone,
    assignedTo: api.agentName || 'Unassigned',
    purpose: api.purpose,
    type: api.type,
    status: api.status,
    source: api.source,
    createdAt: api.createdAt,
    updatedAt: api.updatedAt,
    nextFollowUp: api.nextFollowUpDate ?? '',
  };
}
