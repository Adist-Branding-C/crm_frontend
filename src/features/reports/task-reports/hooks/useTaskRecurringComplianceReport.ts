import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeRecurringComplianceReport } from '../utils/recurringCompliance.mapper';
import type {
  GetRecurringComplianceParams,
  ImportPaginationInfo,
  RecurringTaskComplianceRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load recurring task compliance';

/**
 * Loads the paginated chain-level summary for the Recurring Task Compliance
 * report.
 *
 * Used by:
 * - TaskRecurringComplianceReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (every filter change and every pagination page change).
 * - The drill-down instance history is a separate concern owned by
 *   useTaskRecurringComplianceInstances (used by the drill-down modal).
 */
export function useTaskRecurringComplianceReport() {
  const [chains, setChains] = useState<RecurringTaskComplianceRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetRecurringComplianceParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getRecurringCompliance(params);
      const report = normalizeRecurringComplianceReport(response.data);
      setChains(report.chains);
      setPagination(report.pagination);
    } catch {
      setChains([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { chains, pagination, isLoading, error, fetchReport };
}