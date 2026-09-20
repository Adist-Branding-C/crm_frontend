export interface TaskViewFilters {
  taskType?: string;
  search?: string;
}

export function normalizeTaskType(taskType?: string): string | undefined {
  if (!taskType || taskType === 'ALL') return undefined;
  return taskType;
}

export function buildUnifiedTaskListQuery(
  filters: TaskViewFilters,
  pageNumber: number,
  limit: number,
): Record<string, string | number | undefined> {
  const query: Record<string, string | number | undefined> = {
    pageNumber,
    limit,
  };

  const normalizedTaskType = normalizeTaskType(filters.taskType);
  const trimmedSearch = filters.search?.trim();

  if (trimmedSearch) query.search = trimmedSearch;
  if (normalizedTaskType) query.taskType = normalizedTaskType;

  return query;
}

export function buildKanbanTaskQuery(
  filters: TaskViewFilters,
  workflowId?: string | null,
): Record<string, string | undefined> {
  const query: Record<string, string | undefined> = {};

  if (workflowId) query.workflowId = workflowId;

  const normalizedTaskType = normalizeTaskType(filters.taskType);
  const trimmedSearch = filters.search?.trim();

  if (normalizedTaskType) query.taskType = normalizedTaskType;
  if (trimmedSearch) query.search = trimmedSearch;

  return query;
}

export function getBoardTaskTotalCount<T extends { count?: number | null }>(stages: T[]): number {
  return stages.reduce((total, stage) => total + (Number(stage?.count) || 0), 0);
}
