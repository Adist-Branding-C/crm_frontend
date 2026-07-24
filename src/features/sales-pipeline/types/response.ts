import type { PaginationMeta } from '../../../shared/types/common';
import type {
  Lead,
  PipelineDeal,
  PipelineStatusGroup,
  LeadStatusGroup,
  Task,
  TaskStatusGroup,
} from './interface';

export interface PipelineDealsResponseData {
  items: PipelineStatusGroup[];
}

export interface StatusDealsResponseData {
  items: PipelineDeal[];
  pagination: PaginationMeta;
}

export interface PipelineLeadsResponseData {
  items: LeadStatusGroup[];
}

export interface StatusLeadsResponseData {
  items: Lead[];
  pagination: PaginationMeta;
}

export interface TasksResponseData {
  items: TaskStatusGroup[];
}

export interface StatusTasksResponseData {
  items: Task[];
  pagination: PaginationMeta;
}
