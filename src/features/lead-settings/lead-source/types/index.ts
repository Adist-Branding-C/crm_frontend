export interface LeadSourceItem {
  id: string;
  source: string;
  addedBy: string;
}

export interface LeadSourceApiItem {
  sourceId: string;
  source: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CreateLeadSourcePayload {
  source: string;
}

export interface UpdateLeadSourcePayload {
  source?: string;
}

export interface CreateLeadSourceResponse {
  status: boolean;
  message: string;
  data: {
    sourceId: string;
  };
}

export interface LeadSourceResponse {
  status: boolean;
  message: string;
  data: LeadSourceApiItem;
}

export interface LeadSourceListResponse {
  status: boolean;
  message: string;
  data: {
    items: LeadSourceApiItem[];
    pagination: PaginationResponse;
  };
}

export interface DeleteLeadSourceResponse {
  status: boolean;
  message: string;
}
