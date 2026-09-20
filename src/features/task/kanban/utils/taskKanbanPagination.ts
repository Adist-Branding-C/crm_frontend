export interface KanbanLoadMoreState {
  hasMore: boolean;
  remaining: number;
  requestedLimit: number;
}

export function getKanbanLoadMoreState({
  totalCount,
  loadedCount,
  defaultLimit,
  hasNext,
}: {
  totalCount: number;
  loadedCount: number;
  defaultLimit: number;
  hasNext?: boolean;
}): KanbanLoadMoreState {
  const remaining = Math.max(0, totalCount - loadedCount);
  const hasMore = Boolean(hasNext) || remaining > 0;
  const requestedLimit = hasMore ? Math.min(defaultLimit || remaining || 1, remaining || defaultLimit || 1) : 0;

  return {
    hasMore,
    remaining,
    requestedLimit,
  };
}
