import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTaskSummaryRows } from '../utils/taskSummary.mapper';
import type { GetTaskSummaryParams, TaskSummaryRow } from '../types';

const ERROR_MESSAGE = 'Failed to load task summary data';

/**
 * Loads the per-staff task summary for the Task Summary / Productivity report.
 *
 * Used by:
 * - TaskSummaryReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (on mount and whenever its date/staff/workflow filters change).
 */
export function useTaskSummaryReport() {
  const [rows, setRows] = useState<TaskSummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetTaskSummaryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getSummary(params);
      setRows(normalizeTaskSummaryRows(response.data));
    } catch {
      setRows([]);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { rows, isLoading, error, fetchReport };
}