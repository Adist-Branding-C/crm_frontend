import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadSourceStatisticsParams, LeadSourceCountItem } from '../types';

const SOURCE_COLOR_PALETTE = ['#e2e8f0', '#cbd5e1', '#e2e8f0', '#cbd5e1', '#e2e8f0', '#cbd5e1'];
const DEFAULT_SOURCE_COLOR = '#cbd5e1';

function colorForIndex(index: number): string {
  return SOURCE_COLOR_PALETTE[index % SOURCE_COLOR_PALETTE.length] ?? DEFAULT_SOURCE_COLOR;
}

export function useLeadSourceStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [items, setItems] = useState<(LeadSourceCountItem & { color: string })[]>([]);
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
        const params: GetLeadSourceStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getLeadSourceStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setItems(
          response.data.leadsBySource.map((item, index) => ({
            ...item,
            color: colorForIndex(index),
          })),
        );
      } catch (error) {
        if (!cancelled) {
          console.error('useLeadSourceStatistics: failed to load lead source statistics', error);
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
