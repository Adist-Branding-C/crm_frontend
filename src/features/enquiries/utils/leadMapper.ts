import type { LeadApiItem, Lead } from '../types';

export function getLeadIds(leads: Lead[]): string[] {
  return leads.map(item => item.leadId);
}

export function mapApiToUI(item: LeadApiItem): Lead {
  return {
    id: item.id,
    leadId: item.leadId,
    name: item.name,
    phone: item.phone,
    email: item.email ?? '',
    location: item.location ?? '',
    address: item.address ?? '',
    assignedTo: item.agent ?? item.assignedTo ?? '',
    purpose: item.purpose ?? '',
    type: item.type ?? '',
    status: item.status ?? '',
    source: item.source ?? '',
    createdAt: item.createdAt ?? '',
    updatedAt: item.updatedAt ?? '',
    nextFollowUp: item.nextFollowUpDate ?? '',
    additionalFields: item.additionalFields ?? [],
  };
}
