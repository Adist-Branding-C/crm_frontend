import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type {
  CampaignsStatisticsResponseData,
  DashboardPeriod,
  GetCampaignsStatisticsParams,
} from '../types';

export function useCampaignsStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [stats, setStats] = useState<CampaignsStatisticsResponseData | null>(null);
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
        const params: GetCampaignsStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }

        const response = await dashboardService.getCampaignsStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setStats(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useCampaignsStatistics: failed to load campaigns statistics', error);
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
    byStatus: stats?.byStatus ?? [],
    byType: stats?.byType ?? [],
    leadProgress: stats?.leadProgress ?? null,
    isLoading,
    isError,
  };
}
