import type { DealAdditionalField } from './interface';

export interface DealApiItem {
  id: number;
  dealId?: string;
  dealName?: string;
  lead?: string | { id?: string | number; name?: string };
  leadId?: string | number;
  mobile?: string;
  amount?: number;
  status?: string | { id?: string | number; name?: string; dealStatus?: string };
  statusId?: string | number;
  type?: string | { id?: string | number; name?: string; dealType?: string };
  typeId?: string | number;
  stage?: string;
  priority?: string;
  assignedTo?: string;
  agent?: string | { id?: string | number; name?: string };
  agentId?: string | number;
  createdBy?: string | { id?: string | number; name?: string } | null;
  createdByType?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  additionalFields?: DealAdditionalField[];
}

export interface PaginationInfo {
  pageNumber: number;
  limit: number;
  total: number;
  totalPages: number;
  total_pages?: number;
  has_next?: boolean;
  has_previous?: boolean;
  page?: number;
}

export interface DealListData {
  items: DealApiItem[];
  pagination: PaginationInfo;
}

export interface DealResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
