import type { AutomationRule } from './interface';

export interface AutomationListResponse {
  items?: AutomationRule[];
  pagination?: {
    total: number;
  };
}
