import type { LeadApiItem, Lead, LeadTaskFormData } from '../types';
import type { TaskFormData, TaskFormDataUpdate } from '../../task/task/types';
import type { UnifiedTaskFormValues } from '../../task/common/types/unifiedTask.types';
import type { RepeatType } from '../../task/common/constants/taskEnums';

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
    contactNumbers: item.contactNumbers ?? [],
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


export interface LeadTaskFormValues extends LeadTaskFormData {
  taskType?: string;
  workflowId?: string | number;
  stageId?: string | number;
  dealId?: string | number | undefined;
  campaignId?: string | number | undefined;
  repeatType?: RepeatType;
  repeatConfig?: { dayOfWeek?: number; dayOfMonth?: number | 'last' } | undefined;
}

/**
 * Adapts the unified task form values (GenericTaskForm field names) to the shape
 * the lead task payload mappers consume. The only field-name change is
 * categoryId -> category; the unified task fields are carried through as-is.
 */
export function toLeadTaskFormData(values: UnifiedTaskFormValues): LeadTaskFormValues {
  return {
    title: values.title,
    description: values.description,
    category: values.categoryId,
    scheduledDate: values.scheduledDate,
    scheduledTime: values.scheduledTime,
    assignedTo: values.assignedTo,
    priority: values.priority,
    status: values.status,
    taskType: values.taskType,
    workflowId: values.workflowId,
    stageId: values.stageId,
    dealId: values.dealId,
    campaignId: values.campaignId,
    repeatType: values.repeatType,
    repeatConfig: values.repeatConfig,
  };
}

export function toTaskUpdatePayload(data: LeadTaskFormValues): TaskFormDataUpdate & { taskType?: string; dealId?: string; campaignId?: string } {
  return {
    title: data.title,
    description: data.description,
    categoryId: data.category ? Number(data.category) : undefined,
    scheduledDate: data.scheduledDate,
    scheduledTime: data.scheduledTime,
    assignedTo: String(data.assignedTo),
    priority: data.priority,
    status: data.status,
    ...(data.taskType ? { taskType: data.taskType } : {}),
    ...(data.workflowId != null ? { workflowId: String(data.workflowId) } : {}),
    ...(data.stageId != null ? { stageId: String(data.stageId) } : {}),
    ...(data.dealId != null ? { dealId: String(data.dealId) } : {}),
    ...(data.campaignId != null ? { campaignId: String(data.campaignId) } : {}),
    ...(data.repeatType ? { repeatType: data.repeatType } : {}),
    ...(data.repeatConfig ? { repeatConfig: data.repeatConfig } : {}),
  };
}

export function toTaskCreatePayload(data: LeadTaskFormValues, leadId: number): TaskFormData & { taskType?: string; dealId?: string; campaignId?: string } {
  return {
    title: data.title,
    description: data.description,
    categoryId: data.category ? Number(data.category) : undefined,
    scheduledDate: data.scheduledDate,
    scheduledTime: data.scheduledTime,
    assignedTo: String(data.assignedTo),
    leadId: String(leadId),
    priority: data.priority,
    status: data.status,
    ...(data.taskType ? { taskType: data.taskType } : {}),
    ...(data.workflowId != null ? { workflowId: String(data.workflowId) } : {}),
    ...(data.stageId != null ? { stageId: String(data.stageId) } : {}),
    ...(data.dealId != null ? { dealId: String(data.dealId) } : {}),
    ...(data.campaignId != null ? { campaignId: String(data.campaignId) } : {}),
    ...(data.repeatType ? { repeatType: data.repeatType } : {}),
    ...(data.repeatConfig ? { repeatConfig: data.repeatConfig } : {}),
  };
}
