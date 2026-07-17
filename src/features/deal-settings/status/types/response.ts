import type { ApiResponse } from '../../../../shared/types/common';
import type { ApiDealStatusItem } from './interface';

export type DealStatusListResponse = ApiResponse<{ items: ApiDealStatusItem[]; pagination?: { total: number } }>;

export type DealStatusResponse = ApiResponse<ApiDealStatusItem>;

export type DeleteDealStatusResponse = ApiResponse<undefined>;
