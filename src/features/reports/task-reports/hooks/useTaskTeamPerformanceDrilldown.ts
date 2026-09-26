import { useCallback, useRef, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTeamPerformanceStaff } from '../utils/teamPerformance.mapper';
import type {
  GetTeamPerformanceParams,
  ImportPaginationInfo,
  TeamPerformanceDrilldownData,
  TeamPerformanceStaffRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load team member breakdown';

/**
 * Loads the full per-staff breakdown for one group in the Task Team /
 * Department Performance report's drill-down modal (the endpoint returns the
 * complete staff list in drill-down mode - no server-side pagination).
 *
 * Used by:
 * - TeamPerformanceDrilldownModal
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the modal owns when to call
 *   `fetchReport` (every open / group change and filter change).
 * - In-flight responses are guarded so a trailing request can never overwrite
 *   data from a newer request (opening a different group's breakdown while
 *   another is still loading).
 */
export function useTaskTeamPerformanceDrilldown() {
  const [rows, setRows] = useState<TeamPerformanceStaffRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestSeqRef = useRef(0);

  const fetchReport = useCallback(async (params: GetTeamPerformanceParams) => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const response =
        await taskReportService.getTeamPerformance<TeamPerformanceDrilldownData>(params);
      if (requestSeq !== requestSeqRef.current) return;
      const report = normalizeTeamPerformanceStaff(response.data);
      setRows(report.rows);
      setPagination(report.pagination);
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setRows([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      if (requestSeq === requestSeqRef.current) setIsLoading(false);
    }
  }, []);

  return { rows, pagination, isLoading, error, fetchReport };
}