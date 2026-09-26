import { useCallback, useRef, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { normalizeRecurringComplianceInstances } from '../utils/recurringCompliance.mapper';
import type {
  GetRecurringComplianceInstancesParams,
  ImportPaginationInfo,
  RecurringTaskInstanceRow,
} from '../types';

const ERROR_MESSAGE = 'Failed to load recurring task instances';

/**
 * Loads the paginated instance-level history for one recurring chain in the
 * Recurring Task Compliance report's drill-down modal.
 *
 * Used by:
 * - RecurringComplianceInstancesModal
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the modal owns when to call
 *   `fetchInstances` (opening / chain change and every pagination page change).
 * - In-flight responses are guarded so a trailing request can never overwrite
 *   data from a newer request (opening a different chain while another is still
 *   loading).
 */
export function useTaskRecurringComplianceInstances() {
  const [instances, setInstances] = useState<RecurringTaskInstanceRow[]>([]);
  const [pagination, setPagination] = useState<ImportPaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestSeqRef = useRef(0);

  const fetchInstances = useCallback(async (params: GetRecurringComplianceInstancesParams) => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getRecurringComplianceInstances(params);
      if (requestSeq !== requestSeqRef.current) return;
      const report = normalizeRecurringComplianceInstances(response.data);
      setInstances(report.instances);
      setPagination(report.pagination);
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setInstances([]);
      setPagination(null);
      setError(ERROR_MESSAGE);
    } finally {
      if (requestSeq === requestSeqRef.current) setIsLoading(false);
    }
  }, []);

  return { instances, pagination, isLoading, error, fetchInstances };
}