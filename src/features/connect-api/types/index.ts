export interface ApiParameter {
  parameter: string;
  type: string;
  required: string;
  description: string;
}

export interface Tab {
  id: string;
  label: string;
}

export interface ApiTokenData {
  apiToken: string;
}

export interface ApiRequestLogItem {
  id: number;
  status: 'pending' | 'success' | 'failed';
  name: string | null;
  phone: string | null;
  payload: Record<string, unknown> | null;
  responseStatus: number | null;
  response: Record<string, unknown> | null;
  leadId: number | null;
  createdAt: string;
}

export interface ApiRequestLogPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiRequestLogData {
  items: ApiRequestLogItem[];
  pagination: ApiRequestLogPagination;
}
