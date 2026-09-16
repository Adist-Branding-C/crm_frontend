import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTaskActivityReport } from '../utils/taskActivity.mapper';
import type {
  GetTaskActivityParams,
  ImportPaginationInfo,
  TaskActivityRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load task activity report';

/**
 * Loads the paginated row-level data for the Task Work / Activity report.
 *
 * Used by:
 * - TaskActivityReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (every filter change and every pagination page change).
 * - CSV export is a separate concern owned by useTaskActivityExport.
 */
export function useTaskActivityReport() {
  const [tasks, setTasks] = useState<TaskActivityRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetTaskActivityParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getActivityReport(params);
      const report = normalizeTaskActivityReport(response.data);
      setTasks(report.tasks);
      setPagination(report.pagination);
    } catch {
      setTasks([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { tasks, pagination, isLoading, error, fetchReport };
}