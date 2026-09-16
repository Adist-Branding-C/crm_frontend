import type {
  ImportPaginationInfo,
  RecurringComplianceInstancesData,
  RecurringComplianceReportData,
  RecurringTaskComplianceRow,
  RecurringTaskInstanceRow,
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
 * Normalizes the RecurringComplianceReportData API payload (the chain-level
 * summary mode of GET /reports/tasks/recurring-compliance) into the shape the
 * Recurring Task Compliance page renders from. Guards against an undefined
 * payload and missing pagination so the page always receives a complete view
 * model.
 *
 * Used by:
 * - useTaskRecurringComplianceReport
 */
export function normalizeRecurringComplianceReport(
  data?: RecurringComplianceReportData,
): RecurringComplianceReportData {
  return {
    chains: Array.isArray(data?.chains)
      ? data.chains
      : ([] as RecurringTaskComplianceRow[]),
    pagination: normalizePagination(data?.pagination),
  };
}

/**
 * Normalizes the RecurringComplianceInstancesData API payload (the drill-down
 * mode of GET /reports/tasks/recurring-compliance) into the shape the drill-down
 * modal renders from.
 *
 * Used by:
 * - useTaskRecurringComplianceInstances
 */
export function normalizeRecurringComplianceInstances(
  data?: RecurringComplianceInstancesData,
): RecurringComplianceInstancesData {
  return {
    instances: Array.isArray(data?.instances)
      ? data.instances
      : ([] as RecurringTaskInstanceRow[]),
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