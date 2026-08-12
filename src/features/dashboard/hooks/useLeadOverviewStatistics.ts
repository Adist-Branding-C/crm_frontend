import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadOverviewStatisticsParams, LeadOverviewStatisticsResponseData } from '../types';

export function useLeadOverviewStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [stats, setStats] = useState<LeadOverviewStatisticsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      // totalLeads/todayLeads/leadsThisMonth/myLeads are always all-time (not
      // period-bound), so they stay as-is. conversionRate and leadsByType ARE
      // period-bound, so an incomplete custom range shouldn't leave their last
      // range's values on screen looking current.
      setStats((prev) => (prev ? { ...prev, conversionRate: 0, leadsByType: [] } : prev));
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetLeadOverviewStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getLeadOverviewStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setStats(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useLeadOverviewStatistics: failed to load lead overview statistics', error);
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
    totalLeads: stats?.totalLeads ?? 0,
    todayLeads: stats?.todayLeads ?? 0,
    leadsThisWeek: stats?.leadsThisWeek ?? 0,
    leadsThisMonth: stats?.leadsThisMonth ?? 0,
    myLeads: stats?.myLeads ?? 0,
    conversionRate: stats?.conversionRate ?? 0,
    leadsByType: stats?.leadsByType ?? [],
    isLoading,
    isError,
  };
}
