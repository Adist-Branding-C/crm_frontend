import type { LeadTypeApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CreateLeadTypeData {
  typeId: string;
}

export interface LeadTypeListData {
  items: LeadTypeApiItem[];
  pagination: PaginationResponse;
}

export interface CreateLeadTypeResponse {
  status: boolean;
  message: string;
  data?: CreateLeadTypeData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadTypeResponse {
  status: boolean;
  message: string;
  data?: LeadTypeApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadTypeListResponse {
  status: boolean;
  message: string;
  data?: LeadTypeListData;
}

export interface DeleteLeadTypeResponse {
  status: boolean;
  message: string;
}
