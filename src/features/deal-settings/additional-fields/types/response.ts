import type { ApiResponse } from '../../../../shared/types/common';
import type { ApiDealAdditionalField, DealAdditionalField } from './interface';

export type DealAdditionalFieldListResponse = ApiResponse<{ items: ApiDealAdditionalField[]; pagination?: { total: number } }>;

export type DealAdditionalFieldResponse = ApiResponse<DealAdditionalField>;

export type DeleteDealAdditionalFieldResponse = ApiResponse<undefined>;
