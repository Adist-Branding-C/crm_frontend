import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTeamPerformanceRollup } from '../utils/teamPerformance.mapper';
import type {
  GetTeamPerformanceParams,
  ImportPaginationInfo,
  TeamPerformanceRollupRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load team performance data';

/**
 * Loads the paginated department-level rollup (one row per department) for
 * the Task Team / Department Performance report.
 *
 * Used by:
 * - TaskTeamPerformanceReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (on mount, on every filter change and on every page change).
 * - Per-staff drill-down is a separate concern owned by
 *   useTaskTeamPerformanceDrilldown, opened from a row click.
 */
export function useTaskTeamPerformanceReport() {
  const [rows, setRows] = useState<TeamPerformanceRollupRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetTeamPerformanceParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getTeamPerformance(params);
      const report = normalizeTeamPerformanceRollup(response.data);
      setRows(report.rows);
      setPagination(report.pagination);
    } catch {
      setRows([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { rows, pagination, isLoading, error, fetchReport };
}