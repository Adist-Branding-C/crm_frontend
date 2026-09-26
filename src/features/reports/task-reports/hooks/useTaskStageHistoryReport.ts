import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTaskStageHistory } from '../utils/stageHistory.mapper';
import type {
  GetTaskStageHistoryParams,
  ImportPaginationInfo,
  TaskStageHistoryRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load stage & status change history';

/**
 * Loads the paginated stage-change history for the Stage & Status Change
 * History report.
 *
 * Used by:
 * - TaskStageHistoryReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (every filter change and every pagination page change).
 * - Response payload is normalized (normalizeTaskStageHistory) so rows and
 *   pagination always arrive shaped consistently.
 */
export function useTaskStageHistoryReport() {
  const [history, setHistory] = useState<TaskStageHistoryRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetTaskStageHistoryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getStageHistory(params);
      const report = normalizeTaskStageHistory(response.data);
      setHistory(report.history);
      setPagination(report.pagination);
    } catch {
      setHistory([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { history, pagination, isLoading, error, fetchReport };
}