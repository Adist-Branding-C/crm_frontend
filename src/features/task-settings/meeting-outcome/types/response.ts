import type { ApiResponse } from '../../../../shared/types/common';
import type { MeetingOutcomeItem } from './interface';

export type MeetingOutcomeApiResponse = ApiResponse<MeetingOutcomeItem> & { errors?: Record<string, string[]>; field?: string };

export interface MeetingOutcomeListResponse {
  items: MeetingOutcomeItem[];
  pagination?: { total: number };
}
