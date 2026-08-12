import type { LeadApiItem, Lead, LeadTaskFormData } from '../types';
import type { TaskFormData, TaskFormDataUpdate } from '../../task/task/types';

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
    assignedTo: item.assignedStaff?.name ?? '',
    createdByName: item.createdByName ?? '',
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


export function toTaskUpdatePayload(data: LeadTaskFormData): TaskFormDataUpdate {
  return {
    title: data.title,
    description: data.description,
    categoryId: data.category,
    scheduledDate: data.scheduledDate,
    scheduledTime: data.scheduledTime,
    assignedTo: data.assignedTo,
    priority: data.priority,
    status: data.status,
  };
}

export function toTaskCreatePayload(data: LeadTaskFormData, leadId: number): TaskFormData {
  return {
    title: data.title,
    description: data.description,
    categoryId: data.category,
    scheduledDate: data.scheduledDate,
    scheduledTime: data.scheduledTime,
    assignedTo: data.assignedTo,
    leadId: String(leadId),
    priority: data.priority,
    status: data.status,
  };
}
