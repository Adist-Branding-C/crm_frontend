import type { FollowupLead, FollowupLeadApiItem } from '../types';

/**
 * Maps one GET /followup/leads item to the flat, always-non-null shape the
 * table/badges render against - nullable lookup fields (agent/type/status/
 * source/purpose) default to '' here so render code never has to null-guard,
 * matching EnquiriesRow's convention of defaulting at the mapper boundary.
 */
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
