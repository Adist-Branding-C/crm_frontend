export interface LeadPurposeItem {
  id: string;
  title: string;
}

export interface LeadPurposeApiItem {
  purpose_id: string;
  purpose: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadPurposePayload {
  purpose: string;
}

export interface UpdateLeadPurposePayload {
  purpose?: string;
}

export interface CreateLeadPurposeResponse {
  status: boolean;
  message: string;
  data: {
    purpose_id: string;
  };
}

export interface LeadPurposeResponse {
  status: boolean;
  message: string;
  data: LeadPurposeApiItem;
}

export interface LeadPurposeListResponse {
  status: boolean;
  message: string;
  data: {
    items: LeadPurposeApiItem[];
    pagination: PaginationResponse;
  };
}

export interface DeleteLeadPurposeResponse {
  status: boolean;
  message: string;
}
