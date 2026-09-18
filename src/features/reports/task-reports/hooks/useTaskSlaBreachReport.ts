import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeTaskSlaBreachReport } from '../utils/slaBreach.mapper';
import type {
  GetSlaBreachesParams,
  ImportPaginationInfo,
  RepeatOffenderRow,
  SlaBreachRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load SLA breach report';

/**
 * Loads the breach history plus repeat-offender list for the SLA Breach &
 * Escalation report.
 *
 * Used by:
 * - TaskSLABreachReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (every filter change and every pagination page change).
 * - Response payload is normalized (normalizeTaskSlaBreachReport) so breaches,
 *   pagination and repeat offenders always arrive shaped consistently.
 */
export function useTaskSlaBreachReport() {
  const [breaches, setBreaches] = useState<SlaBreachRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [repeatOffenders, setRepeatOffenders] = useState<RepeatOffenderRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetSlaBreachesParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getSlaBreaches(params);
      const report = normalizeTaskSlaBreachReport(response.data);
      setBreaches(report.breaches);
      setPagination(report.pagination);
      setRepeatOffenders(report.repeatOffenders);
    } catch {
      setBreaches([]);
      setPagination(null);
      setRepeatOffenders([]);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { breaches, pagination, repeatOffenders, isLoading, error, fetchReport };
}