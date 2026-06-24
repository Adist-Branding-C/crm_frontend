export interface LeadStatusItem {
  id: string;
  status: string;
  color: string;
  useForConversion: boolean;
}

export interface LeadStatusApiItem {
  statusId: string;
  status: string;
  color: string;
  conversion: boolean;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateLeadStatusPayload {
  status: string;
  color: string;
  conversion: boolean;
}

export interface UpdateLeadStatusPayload {
  status?: string;
  color?: string;
  conversion?: boolean;
}

export interface CreateLeadStatusResponse {
  status: boolean;
  message: string;
  data: {
    statusId: string;
  };
}

export interface LeadStatusResponse {
  status: boolean;
  message: string;
  data: LeadStatusApiItem;
}

export interface LeadStatusListResponse {
  status: boolean;
  message: string;
  data: {
    items: LeadStatusApiItem[];
    pagination: PaginationResponse;
  };
}

export interface DeleteLeadStatusResponse {
  status: boolean;
  message: string;
}
