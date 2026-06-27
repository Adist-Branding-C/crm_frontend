export interface LeadPurposeItem {
  id: string;
  title: string;
}

export interface LeadPurposeApiItem {
  id: number;
  purposeId: string;
  purpose: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
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
    purposeId: string;
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
