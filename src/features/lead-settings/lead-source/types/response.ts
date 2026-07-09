import type { LeadSourceApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CreateLeadSourceData {
  sourceId: string;
}

export interface LeadSourceListData {
  items: LeadSourceApiItem[];
  pagination: PaginationResponse;
}

export interface CreateLeadSourceResponse {
  status: boolean;
  message: string;
  data?: CreateLeadSourceData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadSourceResponse {
  status: boolean;
  message: string;
  data?: LeadSourceApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadSourceListResponse {
  status: boolean;
  message: string;
  data?: LeadSourceListData;
}

export interface DeleteLeadSourceResponse {
  status: boolean;
  message: string;
}
