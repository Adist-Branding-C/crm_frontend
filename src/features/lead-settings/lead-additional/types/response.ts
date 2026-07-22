import type { LeadAdditionalApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadAdditionalData {
  fieldId: string;
}

export interface LeadAdditionalListData {
  items: LeadAdditionalApiItem[];
  pagination: PaginationResponse;
}

export interface CreateLeadAdditionalResponse {
  status: boolean;
  message: string;
  data?: CreateLeadAdditionalData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadAdditionalResponse {
  status: boolean;
  message: string;
  data?: LeadAdditionalApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadAdditionalListResponse {
  status: boolean;
  message: string;
  data?: LeadAdditionalListData;
}

export interface UpdateLeadAdditionalResponse {
  status: boolean;
  message: string;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface DeleteLeadAdditionalResponse {
  status: boolean;
  message: string;
}
