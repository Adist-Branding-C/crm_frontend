import type { LeadAdditionalField, Remark, ActivityItem } from './interface';

export interface LeadApiItem {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  countryCode: string | null;
  email: string | null;
  location: string | null;
  address: string | null;
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
  deletedAt?: string | null;
  deletedByName?: string | null;
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

export interface CreateLeadData {
  leadId: string;
}

export interface RemarkListData {
  items: Remark[];
  pagination: Record<string, unknown>;
}

export interface ActivityListData {
  items: ActivityItem[];
}
