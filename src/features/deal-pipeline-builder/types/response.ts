import type { ApiResponse } from '../../../shared/types/common';
import type {
  DealPipelineItem,
  DealPipelineDetail,
  DealStageItem,
  DealStageTransitionItem,
} from './interface';

export type DealPipelineListResponse = ApiResponse<DealPipelineItem[]>;
export type DealPipelineDetailResponse = ApiResponse<DealPipelineDetail>;
export type DealStageListResponse = ApiResponse<DealStageItem[]>;
export type DealStageTransitionListResponse = ApiResponse<DealStageTransitionItem[]>;
export type CreatedResponse = ApiResponse<{ id: string }>;
export type SimpleResponse = ApiResponse<undefined>;
