import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetCallLogsCountParams } from '../types';

// Call logs (call_logs table) are written by the CRM's call-logging feature,
// which agents use to record calls they made to a lead - every row here is
// an outbound call by definition, so the count for the selected period IS
// "Outbound Calls Today" (or "...This Week" / "...This Month" / the custom range).
export function useCallLogsCount(period: DashboardPeriod, from?: string, to?: string) {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setTotal(0);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetCallLogsCountParams = { limit: 1, period };
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getCallLogsCount(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setTotal(response.data.pagination.total);
      } catch (error) {
        if (!cancelled) {
          console.error('useCallLogsCount: failed to load call logs count', error);
          setIsError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [period, from, to]);

  return { total, isLoading, isError };
}
