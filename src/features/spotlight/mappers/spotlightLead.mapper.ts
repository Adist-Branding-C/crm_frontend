import type { SpotlightLeadApi, SpotlightLead } from '../types';

export class SpotlightLeadMapper {
  static toDisplay(api: SpotlightLeadApi): SpotlightLead {
    return {
      id: api.id,
      name: api.name,
      phone: api.phone,
      assignedTo: api.agentName || 'Unassigned',
      purpose: api.purpose ?? 'N/A',
      type: api.type ?? 'N/A',
      status: api.status ?? 'N/A',
      source: api.source ?? 'N/A',
      createdAt: api.createdAt,
      updatedAt: api.updatedAt,
      nextFollowUp: api.nextFollowUpDate ?? '',
    };
  }

  static toDisplayList(items: SpotlightLeadApi[]): SpotlightLead[] {
    return items.map((item) => SpotlightLeadMapper.toDisplay(item));
  }
}
