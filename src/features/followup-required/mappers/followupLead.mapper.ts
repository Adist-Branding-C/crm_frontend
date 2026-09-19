import type { FollowupLead, FollowupLeadApiItem } from '../types';

export function mapApiItemToFollowupLead(
  item: FollowupLeadApiItem,
): FollowupLead {
  return {
    id: item.id,
    leadId: item.leadId,
    name: item.name,
    countryCode: item.countryCode ?? '',
    phone: item.phone,
    phone2: item.phone2 ?? '',
    countryCode2: item.countryCode2 ?? '',
    phone3: item.phone3 ?? '',
    countryCode3: item.countryCode3 ?? '',
    assignedTo: item.agent ?? '',
    purpose: item.purpose ?? '',
    type: item.type ?? '',
    status: item.status ?? '',
    source: item.source ?? '',
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    nextFollowUp: item.nextFollowUpDate ?? '',
  };
}
