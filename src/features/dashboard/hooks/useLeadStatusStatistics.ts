import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadStatusStatisticsParams, LeadStatusCountItem } from '../types';

const STATUS_COLOR_PALETTE = ['#f472b6', '#38bdf8', '#eab308', '#fb7185', '#34d399', '#fbbf24'];
const DEFAULT_STATUS_COLOR = '#38bdf8';

function colorForIndex(index: number): string {
  return STATUS_COLOR_PALETTE[index % STATUS_COLOR_PALETTE.length] ?? DEFAULT_STATUS_COLOR;
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
