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
  statusId: number;
  status: string;
  count: number;
  items: PipelineDeal[];
}

export interface PipelineLeadsResponseData {
  items: LeadStatusGroup[];
}

export interface StatusLeadsResponseData {
  statusId: string;
  status: string;
  count: number;
  items: Lead[];
}

export interface TasksResponseData {
  items: TaskStatusGroup[];
}

export interface StatusTasksResponseData {
  statusId: string;
  status: string;
  count: number;
  items: Task[];
}
