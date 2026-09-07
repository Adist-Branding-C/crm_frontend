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
  pipelineId?: string | number;
  stageId?: string | number;
  type?: string | { id?: string | number; name?: string; dealType?: string };
  stage?: string;
  priority?: string;
  lostReason?: string | null;
  assignedTo?: string;
  agent?: string | { id?: string | number; name?: string; staff_id?: string };
  agentId?: string | number;
  createdBy?: string | { id?: string | number; name?: string } | null;
  createdByType?: string;
  startDate?: string;
  endDate?: string;
  closeDate?: string;
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

export interface DealCallLogItem {
  id: number;
  leadId: string;
  callStatus?: string | null;
  leadStatus?: string | null;
  purpose?: string | null;
  agentName?: string | null;
  remark?: string | null;
  nextFollowUpDate?: string | null;
  createdAt?: string;
}

export interface DealCallLogListData {
  items: DealCallLogItem[];
  pagination: PaginationInfo;
}
