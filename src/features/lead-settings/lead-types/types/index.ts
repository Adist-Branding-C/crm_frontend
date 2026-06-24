export interface LeadTypeItem {
  id: string;
  addedBy: string;
  type: string;
}

export interface LeadTypeApiItem {
  typeId: string;
  type: string;
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

export interface CreateLeadTypePayload {
  type: string;
}

export interface UpdateLeadTypePayload {
  type?: string;
}

export interface CreateLeadTypeResponse {
  status: boolean;
  message: string;
  data: {
    typeId: string;
  };
}

export interface LeadTypeResponse {
  status: boolean;
  message: string;
  data: LeadTypeApiItem;
}

export interface LeadTypeListResponse {
  status: boolean;
  message: string;
  data: {
    items: LeadTypeApiItem[];
    pagination: PaginationResponse;
  };
}

export interface DeleteLeadTypeResponse {
  status: boolean;
  message: string;
}
