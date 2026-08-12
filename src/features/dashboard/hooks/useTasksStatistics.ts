import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetTasksStatisticsParams, TasksStatisticsResponseData } from '../types';

function percentOf(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((part / total) * 100));
}

export function useTasksStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [stats, setStats] = useState<TasksStatisticsResponseData | null>(null);
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
        const params: GetTasksStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }

        const response = await dashboardService.getTasksStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setStats(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useTasksStatistics: failed to load tasks statistics', error);
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

  const total = stats?.total ?? 0;
  const pending = stats?.pending ?? 0;
  const overdue = stats?.overdue ?? 0;

  return {
    total,
    pending,
    overdue,
    pendingPercent: percentOf(pending, total),
    overduePercent: percentOf(overdue, total),
    isLoading,
    isError,
  };
}
