import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetInProgressDealsParams } from '../types';

export function useInProgressDeals(period: DashboardPeriod, from?: string, to?: string) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) return;

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetInProgressDealsParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }
        const response = await dashboardService.getInProgressDeals(params);
        if (cancelled) return;
        if (response.status && response.data) {
          setCount(response.data.count);
        } else {
          setIsError(true);
        }
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [period, from, to]);

  return { count, isLoading, isError };
}
