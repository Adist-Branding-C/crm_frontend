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
    countryCode: item.countryCode ?? '',
    email: item.email ?? '',
    location: item.location ?? '',
    address: item.address ?? '',
    assignedTo: item.assignedStaff?.name ?? item.agent ?? item.assignedTo ?? '',
    purpose: item.purpose?.purpose ?? '',
    type: item.type?.type ?? '',
    status: item.status?.status ?? '',
    source: item.source?.source ?? '',
    createdAt: item.createdAt ?? '',
    updatedAt: item.updatedAt ?? '',
    nextFollowUp: item.nextFollowUpDate ?? '',
    additionalFields: item.additionalFields ?? [],
    deletedAt: item.deletedAt ?? '',
    deletedBy: item.deletedByName ?? '',
  };
}
