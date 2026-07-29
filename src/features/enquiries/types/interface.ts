import type { DateRange } from '../../../shared/types/common';

export interface LeadAdditionalField {
  fieldId: string;
  name: string;
  value: string;
}

export interface Lead {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  location: string;
  address: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
  additionalFields: LeadAdditionalField[];
  deletedAt?: string;
  deletedBy?: string;
}

export interface Filters {
  dateRange: DateRange;
  filterByDate: string;
  sourceId: string;
  purposeId: string;
  leadStatus: string;
  followupAdded: string;
  assignedTo: string;
  typeId: string;
  location: string;
  remarks: string;
  additionalFields: Record<string, string>;
}

export interface AdditionalFieldDef {
  fieldId: string;
  fieldKey: string;
  name: string;
  fieldType: string;
  values: string[];
  connectWithLeadPurpose: boolean;
  purposeId: string | null;
}

export interface Remark {
  id: number;
  agentName: string;
  remarkNote: string;
  createdAt: string;
  referenceId: number;
  entityType: string;
}

export interface LeadTaskItem {
  id: number;
  title: string;
  description: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  performedBy: string;
  [key: string]: unknown;
}
