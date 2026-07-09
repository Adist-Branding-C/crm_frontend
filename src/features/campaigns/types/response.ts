import type { Campaign } from './interface';

export interface CampaignListResponse {
  items?: Campaign[];
  pagination?: {
    total: number;
  };
}
