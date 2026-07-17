import type { ApiResponse } from '../../../../shared/types/common';
import type { ApiDealTypeItem, DealTypeItem } from './interface';

export type DealTypeListResponse = ApiResponse<{ items: ApiDealTypeItem[]; pagination?: { total: number } }>;

export type DealTypeResponse = ApiResponse<DealTypeItem>;

export type DeleteDealTypeResponse = ApiResponse<undefined>;
