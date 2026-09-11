import type { PaginationMeta } from '../../../../shared/types/common';

export type TaskTypeFilter = 'NORMAL' | 'CALL_TASK' | 'CAMPAIGN_TASK' | 'DEAL_TASK';

/** Task row nested under each stage in the kanban endpoint response. */
export interface TaskKanbanTask {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  priority: string;
  status: string;
  type: string;
  assignedTo?: { id: number; name: string } | null;
  leadId?: { id: number; name: string } | null;
  dealId?: { id: number; name: string } | null;
  campaignId?: { id: number; name: string } | null;
  repeatType?: 'Never' | 'Daily' | 'Weekly' | 'Monthly';
  repeatConfig?: {
    dayOfWeek?: number;
    dayOfMonth?: number | 'last';
  };
}

/** Raw stage shape as returned by GET /tasks/kanban (snake-cased, nested). */
export interface TaskKanbanStageResponse {
  id: string | number;
  name: string;
  color: string;
  sortOrder: number;
  count: number;
  pagination: PaginationMeta;
  tasks: TaskKanbanTask[];
}

/** The kanban endpoint nests stages under data.stages. */
export interface TaskKanbanResponse {
  status: boolean;
  message: string;
  data: {
    workflow: { id: string | number; name: string; isDefault: boolean } | null;
    stages: TaskKanbanStageResponse[];
  };
}

/** UI-facing stage used by the board (renamed fields, tasks -> items). */
export interface TaskKanbanStage {
  stageId: string;
  stageName: string;
  stageColor: string;
  sortOrder: number;
  count: number;
  items: TaskKanbanTask[];
  pagination: PaginationMeta;
}

export type TaskBoardView = 'kanban' | 'table';