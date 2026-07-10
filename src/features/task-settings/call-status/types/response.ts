import type { ApiResponse } from '../../../../shared/types/common';
import type { CallStatusItem } from './interface';

export type CallStatusApiResponse = ApiResponse<CallStatusItem> & { errors?: Record<string, string[]>; field?: string };

export interface CallStatusListResponse {
  items: CallStatusItem[];
  pagination?: { total: number };
}
