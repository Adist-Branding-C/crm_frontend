export interface CallReasonFormData {
  name: string;
  status: string;
}

export interface FetchCallReasonsParams {
  pageNumber: number;
  limit: number;
  search?: string;
}
