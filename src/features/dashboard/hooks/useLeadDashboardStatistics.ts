import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadDashboardStatisticsParams, LeadDashboardStatisticsResponseData } from '../types';

export function useLeadDashboardStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [stats, setStats] = useState<LeadDashboardStatisticsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setStats((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          overview: { ...prev.overview, conversionRate: 0, leadsByType: [] },
          leadsByStatus: [],
          leadsBySource: [],
          leadsByPurpose: [],
        };
      });
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetLeadDashboardStatisticsParams = { 
          period,
          timezoneOffsetMinutes: new Date().getTimezoneOffset() 
        };
        
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getLeadDashboardStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setStats(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useLeadDashboardStatistics: failed to load lead dashboard statistics', error);
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
    stats,
    isLoading,
    isError,
  };
}
