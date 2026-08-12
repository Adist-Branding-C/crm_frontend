import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetLeadPurposeStatisticsParams, LeadPurposeCountItem } from '../types';

const PURPOSE_COLOR_PALETTE = ['#f97316', '#8b5cf6', '#e0323e', '#10b981', '#3b82f6'];
const DEFAULT_PURPOSE_COLOR = '#8b5cf6';

function colorForIndex(index: number): string {
  return PURPOSE_COLOR_PALETTE[index % PURPOSE_COLOR_PALETTE.length] ?? DEFAULT_PURPOSE_COLOR;
}

export function useLeadPurposeStatistics(period: DashboardPeriod, from?: string, to?: string) {
  const [items, setItems] = useState<(LeadPurposeCountItem & { color: string; widthPercent: number })[]>([]);
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
        const params: GetLeadPurposeStatisticsParams = { period };
        if (period === 'custom') {
          if (from) params.fromDate = from;
          if (to) params.toDate = to;
        }

        const response = await dashboardService.getLeadPurposeStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        const rawItems = response.data.leadsByPurpose;
        const maxCount = Math.max(0, ...rawItems.map((item) => item.count));

        setItems(
          rawItems.map((item, index) => ({
            ...item,
            color: colorForIndex(index),
            widthPercent: maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0,
          })),
        );
      } catch (error) {
        if (!cancelled) {
          console.error('useLeadPurposeStatistics: failed to load lead purpose statistics', error);
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
