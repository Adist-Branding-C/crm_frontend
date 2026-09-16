import type {
  ImportPaginationInfo,
  TaskStageHistoryData,
  TaskStageHistoryRow,
} from '../types';

const FALLBACK_PAGINATION: ImportPaginationInfo = {
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 1,
  has_next: false,
  has_previous: false,
};

/**
 * Normalizes the TaskStageHistoryData API payload into the shape the Stage &
 * Status Change History page renders from. Guards against an undefined payload
 * and missing pagination so the page always receives a complete view model.
 *
 * Used by:
 * - useTaskStageHistoryReport
 */
export function normalizeTaskStageHistory(
  data?: TaskStageHistoryData,
): TaskStageHistoryData {
  return {
    history: Array.isArray(data?.history)
      ? data.history
      : ([] as TaskStageHistoryRow[]),
    pagination: normalizePagination(data?.pagination),
  };
}

function normalizePagination(
  pagination?: ImportPaginationInfo,
): ImportPaginationInfo {
  if (!pagination) return FALLBACK_PAGINATION;
  return {
    page: pagination.page ?? 1,
    limit: pagination.limit ?? 10,
    total: pagination.total ?? 0,
    total_pages: pagination.total_pages ?? 1,
    has_next: Boolean(pagination.has_next),
    has_previous: Boolean(pagination.has_previous),
  };
}