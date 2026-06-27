import type { LeadApiItem, Lead } from '../types';

export function mapApiToUI(item: LeadApiItem): Lead {
  return {
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email ?? '',
    location: item.location ?? '',
    assignedTo: item.agent ?? item.assignedTo ?? '',
    purpose: item.purpose ?? '',
    type: item.type ?? '',
    status: item.status ?? '',
    source: item.source ?? '',
    createdAt: item.createdAt ?? '',
    updatedAt: item.updatedAt ?? '',
    nextFollowUp: item.nextFollowUpDate ?? '',
  };
}
