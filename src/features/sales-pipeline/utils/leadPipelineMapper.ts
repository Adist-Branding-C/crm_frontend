import type { Lead, LeadStatusGroup } from '../types/interface';
import type { RawPipelineLead, RawLeadStatusGroup } from '../types/response';

export function mapPipelineLead(item: RawPipelineLead): Lead {
  return {
    id: item.id,
    leadId: item.leadId,
    name: item.name,
    phone: item.phone,
    countryCode: item.countryCode ?? '',
    email: item.email,
    status: item.status?.status ?? '',
    source: item.source?.source ?? '',
    createdAt: item.createdAt,
  };
}

export function mapLeadStatusGroup(group: RawLeadStatusGroup): LeadStatusGroup {
  return { ...group, leads: group.leads.map(mapPipelineLead) };
}
