import type { ApiResponse } from '../../../../shared/types/common';
import type { ApiDealAdditionalField } from './interface';

export type DealAdditionalFieldListResponse = ApiResponse<{ items: ApiDealAdditionalField[]; pagination?: { total: number } }>;

export type DealAdditionalFieldResponse = ApiResponse<ApiDealAdditionalField>;

export type DeleteDealAdditionalFieldResponse = ApiResponse<undefined>;
