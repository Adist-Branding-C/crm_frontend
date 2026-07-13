import type { LeadPurposeApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadPurposeData {
  purposeId: string;
}

export interface LeadPurposeListData {
  items: LeadPurposeApiItem[];
  pagination: PaginationResponse;
}

export interface CreateLeadPurposeResponse {
  status: boolean;
  message: string;
  data?: CreateLeadPurposeData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadPurposeResponse {
  status: boolean;
  message: string;
  data?: LeadPurposeApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface LeadPurposeListResponse {
  status: boolean;
  message: string;
  data?: LeadPurposeListData;
}

export interface DeleteLeadPurposeResponse {
  status: boolean;
  message: string;
}
