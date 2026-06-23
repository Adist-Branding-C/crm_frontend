export interface DealStatusItem {
  id: number;
  name?: string;
  status: string;
}

export interface DealStatusFormData {
  name: string;
  status: string;
}

export interface DealStatusResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
