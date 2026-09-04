import { useEffect, useState } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../shared/constants/chartPalette';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadStatusStatisticsParams, LeadStatusCountItem } from '../types';


function colorForIndex(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length] ?? CHART_PALETTE_DEFAULT;
}

export function useLeadStatusStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [items, setItems] = useState<(LeadStatusCountItem & { color: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setItems([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetLeadStatusStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getLeadStatusStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setItems(
          response.data.leadsByStatus.map((item, index) => ({
            ...item,
            color: colorForIndex(index),
          })),
        );
      } catch (error) {
        if (!cancelled) {
          console.error('useLeadStatusStatistics: failed to load lead status statistics', error);
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

  return { items, isLoading, isError };
}
