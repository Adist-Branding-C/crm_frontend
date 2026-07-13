import type { ApiResponse } from '../../../../shared/types/common';
import type { CallReason } from './interface';

export type CallReasonApiResponse = ApiResponse<CallReason> & { errors?: Record<string, string[]>; field?: string };

export interface CallReasonListResponse {
  items: CallReason[];
  pagination?: { total: number };
}
