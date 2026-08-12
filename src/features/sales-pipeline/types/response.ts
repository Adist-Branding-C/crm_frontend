import type { PaginationMeta } from '../../../shared/types/common';
import type {
  PipelineDeal,
  PipelineStatusGroup,
  Task,
  TaskStatusGroup,
} from './interface';

export interface RawPipelineLead {
  id: number;
  leadId: string | null;
  name: string;
  phone: string;
  email: string;
  status: { statusId: string; status: string } | null;
  source: { sourceId: string; source: string } | null;
  createdAt: string;
}

export interface RawLeadStatusGroup {
  statusId: string;
  status: string;
  color: string;
  count: number;
  leads: RawPipelineLead[];
}

export interface PipelineDealsResponseData {
  items: PipelineStatusGroup[];
}

export interface StatusDealsResponseData {
  statusId: number;
  status: string;
  count: number;
  items: PipelineDeal[];
  pagination: PaginationMeta;
}

export interface PipelineLeadsResponseData {
  items: RawLeadStatusGroup[];
}

export interface StatusLeadsResponseData {
  statusId: string;
  status: string;
  count: number;
  items: RawPipelineLead[];
}

export interface TasksResponseData {
  items: TaskStatusGroup[];
}

export interface StatusTasksResponseData {
  items: Task[];
  pagination: PaginationMeta;
}
