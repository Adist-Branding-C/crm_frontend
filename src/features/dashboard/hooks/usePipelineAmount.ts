import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetPipelineAmountParams, PipelineAmountItem } from '../types';

// "Pipeline" = deals whose status isn't a closed one yet, mirroring the same
// win/lost status-name convention DealService.calculateWinRate/countWonDeals/
// countLostDeals use on the backend.
const CLOSED_STATUS_NAMES = new Set(['win', 'lost']);

function isOpenStatus(statusName: string): boolean {
  return !CLOSED_STATUS_NAMES.has(statusName.toLowerCase());
}

export function usePipelineAmount(period: DashboardPeriod, from?: string, to?: string) {
  const [items, setItems] = useState<PipelineAmountItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      // An incomplete custom range (e.g. the user just cleared one date)
      // shouldn't leave the last range's data on screen looking current.
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
        const params: GetPipelineAmountParams = { period };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }

        const response = await dashboardService.getPipelineAmountStatistics(params);
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setItems(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('usePipelineAmount: failed to load pipeline amount statistics', error);
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

  const pipelineAmount = items
    .filter((item) => isOpenStatus(item.statusName))
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  return {
    pipelineAmount,
    isLoading,
    isError,
  };
}
