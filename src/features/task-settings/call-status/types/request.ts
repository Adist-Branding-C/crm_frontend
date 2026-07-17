export interface CallStatusFormData {
  name: string;
  status: string;
}

export interface FetchCallStatusParams {
  pageNumber: number;
  limit: number;
  search?: string;
}
