import type { SpotlightLeadApi } from './interface';

export interface SpotlightStatistics {
  createdCount: number;
}

export interface SpotlightPaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// Matches ResponseUtil.buildPaginationResponse's shape - the same shared
// backend response wrapper every paginated list endpoint returns (see e.g.
// daily-activity's ActivityResponseData). Pagination fields are nested under
// `pagination`, not flat on `data`.
export interface SpotlightResponseData {
  items: SpotlightLeadApi[];
  pagination: SpotlightPaginationMeta;
  statistics?: SpotlightStatistics;
}
