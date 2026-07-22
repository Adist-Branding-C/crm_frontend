import type { LeadStatusApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadStatusData {
  statusId: string;
}

export interface LeadStatusListData {
  items: LeadStatusApiItem[];
  pagination: PaginationResponse;
}

export interface CreateLeadStatusResponse {
  status: boolean;
  message: string;
  data?: CreateLeadStatusData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadStatusResponse {
  status: boolean;
  message: string;
  data?: LeadStatusApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadStatusListResponse {
  status: boolean;
  message: string;
  data?: LeadStatusListData;
}

export interface DeleteLeadStatusResponse {
  status: boolean;
  message: string;
}
