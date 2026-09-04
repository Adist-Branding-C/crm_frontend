import { useEffect, useState } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../shared/constants/chartPalette';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, DealStageCount, GetDealByStageParams } from '../types';


function colorForIndex(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length] ?? CHART_PALETTE_DEFAULT;
}

export function useDealByStage(period: DashboardPeriod, from?: string, to?: string) {
  const [data, setData] = useState<DealStageCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setData([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

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
