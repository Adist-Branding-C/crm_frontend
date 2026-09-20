import type { PaginationMeta } from '../../../../shared/types/common';
import type { TaskKanbanStage, TaskKanbanStageResponse, TaskKanbanTask } from '../types/kanban.types';

const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 0,
  total: 0,
  total_pages: 1,
  has_next: false,
  has_previous: false,
};

export class TaskKanbanMapper {
  static normalizeTask(task: Record<string, unknown>): TaskKanbanTask {
    const repeatTypeCandidates = [task.repeatType, task.repeat_type];
    const repeatConfigCandidates = [task.repeatConfig, task.repeat_config];

    const repeatType =
      repeatTypeCandidates.find((value) => value !== undefined && value !== null && value !== 'never') as TaskKanbanTask['repeatType'] | undefined ??
      repeatTypeCandidates.find((value) => value !== undefined && value !== null) as TaskKanbanTask['repeatType'] | undefined ??
      undefined;
    const repeatConfig =
      repeatConfigCandidates.find((value) => value !== undefined && value !== null) as TaskKanbanTask['repeatConfig'] | undefined ??
      undefined;

    return {
      ...(task as TaskKanbanTask),
      repeatType,
      repeatConfig,
    };
  }

  static toStage(raw: TaskKanbanStageResponse): TaskKanbanStage {
    return {
      stageId: String(raw.id),
      stageName: raw.name,
      stageColor: raw.color,
      sortOrder: raw.sortOrder,
      count: raw.count ?? 0,
      items: (raw.tasks ?? []).map((task) => TaskKanbanMapper.normalizeTask(task as Record<string, unknown>)),
      pagination: raw.pagination ?? { ...DEFAULT_PAGINATION, total: raw.count ?? 0 },
    };
  }

  static toStages(raw: TaskKanbanStageResponse[] | undefined | null): TaskKanbanStage[] {
    return (raw ?? []).map((stage) => TaskKanbanMapper.toStage(stage));
  }
}