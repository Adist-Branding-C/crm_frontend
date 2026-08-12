export interface PaginationApiMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedLeadsResponse<T> {
  items: T[];
  pagination: PaginationApiMeta;
  statistics: Record<string, number>;
}
