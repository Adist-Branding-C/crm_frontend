import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskWorkflowItem, TaskWorkflowDetail } from './interface';

export type TaskWorkflowListResponse = ApiResponse<TaskWorkflowItem[]>;
export type TaskWorkflowDetailResponse = ApiResponse<TaskWorkflowDetail>;
export type TaskWorkflowCreatedResponse = ApiResponse<{ id: string }>;
export type TaskWorkflowSimpleResponse = ApiResponse<undefined>;
