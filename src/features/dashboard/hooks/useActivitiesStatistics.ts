import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type {
  ActivitiesStatisticsResponseData,
  DashboardPeriod,
  GetActivitiesStatisticsParams,
} from '../types';

export function useActivitiesStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [stats, setStats] = useState<ActivitiesStatisticsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setStats(null);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetActivitiesStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }

        const response = await dashboardService.getActivitiesStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setStats(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useActivitiesStatistics: failed to load activities statistics', error);
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

  return {
    byType: stats?.byType ?? [],
    byEntity: stats?.byEntity ?? [],
    timeline: stats?.timeline ?? [],
    isLoading,
    isError,
  };
}
