export interface LeadAdditionalField {
  fieldId: string;
  name: string;
  value: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
  additionalFields: LeadAdditionalField[];
}

export interface LeadApiItem {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  location: string | null;
  agent: string | null;
  assignedTo: string | null;
  purpose: string | null;
  type: string | null;
  status: string | null;
  source: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  nextFollowUpDate: string | null;
  additionalFields?: LeadAdditionalField[];
}

export interface PaginationInfo {
  pageNumber: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadListData {
  items: LeadApiItem[];
  pagination: PaginationInfo;
}

export interface LeadListResponse {
  status: boolean;
  message: string;
  data: LeadListData;
}

export interface ApiResponse {
  status: boolean;
  message: string;
}

export interface UpdateLeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  agentId?: string;
  purposeId?: string;
  typeId?: string;
  statusId?: string;
  sourceId?: string;
  nextFollowUp?: string;
  notes?: string;
  location?: string;
  address?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}

export interface CreateLeadPayload {
  name: string;
  phone: string;
  email: string;
  sourceId: string;
  agentId?: string;
  purposeId?: string;
  typeId?: string;
  statusId?: string;
  nextFollowUp?: string;
  notes?: string;
  location?: string;
  address?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}

export interface CreateLeadResponse {
  status: boolean;
  message: string;
  data: {
    leadId: string;
  };
}

import type { DateRange } from '../../../shared/types/common';

export interface Filters {
  dateRange: DateRange;
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatus: string;
  followupAdded: string;
  createdBy: string;
  assignedTo: string;
  leadType: string;
  location: string;
  remarks: string;
  date: string;
  additionalFields: Record<string, string>;
}
