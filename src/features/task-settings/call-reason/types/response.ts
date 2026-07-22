import type { CallReasonItem } from './interface';

export interface CallReasonListResponse {
  items: CallReasonItem[];
  pagination?: { total: number };
}
