import type { FollowupLead, FollowupLeadApiItem } from '../types';

export function mapApiItemToFollowupLead(
  item: FollowupLeadApiItem,
): FollowupLead {
  return {
    id: item.id,
    leadId: item.leadId,
    name: item.name,
    phone: item.phone,
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
