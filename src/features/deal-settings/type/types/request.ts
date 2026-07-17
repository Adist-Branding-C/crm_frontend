export interface DealTypeFormData {
  name: string;
  status: boolean;
}

export interface DealTypeQueryParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
}
