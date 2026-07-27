import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, DealStageCount, GetDealByStageParams } from '../types';

const STAGE_COLOR_PALETTE = ['#3b82f6', '#fbbf24', '#ec4899', '#f97316', '#10b981', '#14b8a6', '#8b5cf6'];
const DEFAULT_STAGE_COLOR = '#3b82f6';

function colorForIndex(index: number): string {
  return STAGE_COLOR_PALETTE[index % STAGE_COLOR_PALETTE.length] ?? DEFAULT_STAGE_COLOR;
}

export function useDealByStage(period: DashboardPeriod, from?: string, to?: string) {
  const [data, setData] = useState<DealStageCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) return;

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const params: GetDealByStageParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }
        const response = await dashboardService.getDealByStage(params);
        if (cancelled) return;

        if (!response.status) {
          setIsError(true);
          return;
        }

        const items: DealStageCount[] = (response.data ?? []).map((item, index) => ({
          stage: item.stage,
          count: Number(item.count),
          color: colorForIndex(index),
        }));

        setData(items);
      } catch (error) {
        if (!cancelled) {
          console.error('useDealByStage: failed to load deal by stage data', error);
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

  return { data, isLoading, isError };
}
