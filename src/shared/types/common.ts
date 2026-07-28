export interface SelectOption {
  id: number;
  name: string;
}

export interface LabelValuePair {
  value: string;
  label: string;
}

export interface DateRange {
  start: string;
  end: string;
}


export interface ApiResponse<T = unknown> {
  status: boolean | number;
  message: string;
  data?: T | undefined;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}