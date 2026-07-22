export interface DealStatusFormData {
  name: string;
  stage: string;
  status: boolean;
}

export interface DealStatusQueryParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
}
