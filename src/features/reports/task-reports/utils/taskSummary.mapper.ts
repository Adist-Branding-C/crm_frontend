import type { TaskSummaryRow, TaskSummaryReportData } from '../types';

/**
 * Normalizes the raw task-summary API payload into a flat row array.
 *
 * Used by:
 * - useTaskSummaryReport
 *
 * Notes:
 * - The backend response shape is not guaranteed, so both a bare `TaskSummaryRow[]`
 *   and the `{ items: TaskSummaryRow[] }` list envelope are supported.
 */
export function normalizeTaskSummaryRows(data: TaskSummaryReportData | undefined): TaskSummaryRow[] {
  if (!data) return [];
  return Array.isArray(data) ? data : data.items ?? [];
}