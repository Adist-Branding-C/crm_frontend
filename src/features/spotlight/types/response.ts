import type { SpotlightLeadApi } from './interface';

export interface SpotlightStatistics {
  createdCount: number;
}

export interface SpotlightResponseData {
  items: SpotlightLeadApi[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  statistics: SpotlightStatistics;
}
