import type {
  ImportPaginationInfo,
  RepeatOffenderRow,
  SlaBreachRow,
  TaskSlaBreachReportData,
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
 * Normalizes the TaskSlaBreachReportData API payload into the shape the SLA
 * Breach & Escalation page renders from. Guards against an undefined payload
 * and missing pagination so the page always receives a complete view model.
 *
 * Used by:
 * - useTaskSlaBreachReport
 */
export function normalizeTaskSlaBreachReport(
  data?: TaskSlaBreachReportData,
): TaskSlaBreachReportData {
  return {
    breaches: Array.isArray(data?.breaches) ? data.breaches : ([] as SlaBreachRow[]),
    pagination: normalizePagination(data?.pagination),
    repeatOffenders: Array.isArray(data?.repeatOffenders)
      ? data.repeatOffenders
      : ([] as RepeatOffenderRow[]),
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