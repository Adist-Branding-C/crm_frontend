import type { PaginationMeta } from '../../../../shared/types/common';
import type { TaskKanbanStage, TaskKanbanStageResponse } from '../types/kanban.types';

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 0,
  total: 0,
  total_pages: 1,
  has_next: false,
  has_previous: false,
};

export class TaskKanbanMapper {
  static toStage(raw: TaskKanbanStageResponse): TaskKanbanStage {
    return {
      stageId: String(raw.id),
      stageName: raw.name,
      stageColor: raw.color,
      sortOrder: raw.sortOrder,
      count: raw.count ?? 0,
      items: raw.tasks ?? [],
      pagination: raw.pagination ?? { ...DEFAULT_PAGINATION, total: raw.count ?? 0 },
    };
  }

  static toStages(raw: TaskKanbanStageResponse[] | undefined | null): TaskKanbanStage[] {
    return (raw ?? []).map((stage) => TaskKanbanMapper.toStage(stage));
  }
}