export interface DealTypeItem {
  id: number;
  name: string;
  status: string;
}

export interface DealTypeFormData {
  name: string;
  status: string;
}

export interface DealTypeResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
