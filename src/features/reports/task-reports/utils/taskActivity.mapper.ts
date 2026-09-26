import type {
  ImportPaginationInfo,
  TaskActivityReportData,
  TaskActivityRow,
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
 * Normalizes the TaskActivityReportData API payload of
 * GET /reports/tasks/activity into the shape the Task Work / Activity report
 * page renders from. Guards against an undefined payload and missing
 * pagination so the page always receives a complete view model.
 *
 * Used by:
 * - useTaskActivityReport
 */
export function normalizeTaskActivityReport(
  data?: TaskActivityReportData,
): TaskActivityReportData {
  return {
    tasks: Array.isArray(data?.tasks)
      ? data.tasks
      : ([] as TaskActivityRow[]),
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