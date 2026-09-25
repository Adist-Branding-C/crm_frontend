import type { LeadStatusApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadStatusListData {
  items: LeadStatusApiItem[];
  pagination: PaginationResponse;
}

export interface LeadStatusListResponse {
  status: boolean;
  message: string;
  data?: LeadStatusListData;
}
