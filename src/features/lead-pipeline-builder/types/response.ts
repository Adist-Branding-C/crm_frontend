import type { ApiResponse } from '../../../shared/types/common';
import type { LeadPipelineItem, LeadPipelineDetail, LeadStageItem } from './interface';

export type LeadPipelineListResponse = ApiResponse<LeadPipelineItem[]>;
export type LeadPipelineDetailResponse = ApiResponse<LeadPipelineDetail>;
export type LeadStageListResponse = ApiResponse<LeadStageItem[]>;
export type CreatedPipelineResponse = ApiResponse<{ id: string }>;
export type CreatedStageResponse = ApiResponse<{ statusId: string }>;
export type CreatedTransitionResponse = ApiResponse<{ id: string }>;
export type SimpleResponse = ApiResponse<undefined>;
