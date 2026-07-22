export interface ServiceResponseInput<T> {
  status: boolean | number;
  message: string;
  data?: T | undefined;
}

export interface PagedListResult<T> {
  items: T[];
  total: number;
}
