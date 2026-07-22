import type { CallStatusItem } from './interface';

export interface CallStatusListResponse {
  items: CallStatusItem[];
  pagination?: { total: number };
}
