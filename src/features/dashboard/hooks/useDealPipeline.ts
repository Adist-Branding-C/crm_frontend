import { useEffect, useState } from 'react';
import { dealStatusService } from '../../deal-settings/status/services/dealStatus.service';
import { dashboardService } from '../services/DashboardService';
import type { DashboardPeriod, GetDealStatisticsParams, PipelineDataItem } from '../types';

const STATUSES_PAGE_LIMIT = 100;

const WIN_STAGE_COLOR = '#3b82f6';
const LOSE_STAGE_COLOR = '#ec4899';
const DEFAULT_STAGE_COLOR = '#fbbf24';

function colorForStage(stage: string): string {
  const key = stage.toLowerCase();
  if (key.includes('win')) return WIN_STAGE_COLOR;
  if (key.includes('los')) return LOSE_STAGE_COLOR;
  return DEFAULT_STAGE_COLOR;
}

export function useDealPipeline(period: DashboardPeriod, from?: string, to?: string) {
  const [data, setData] = useState<PipelineDataItem[]>([]);
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
        const statisticsParams: GetDealStatisticsParams = { period };
        if (period === 'custom') {
          if (from) statisticsParams.from = from;
          if (to) statisticsParams.to = to;
        }

        const [statusesResponse, statisticsResponse] = await Promise.all([
          dealStatusService.getAllDealStatuses({ pageNumber: 1, limit: STATUSES_PAGE_LIMIT }),
          dashboardService.getDealStatistics(statisticsParams),
        ]);
        if (cancelled) return;

        if (!statusesResponse.status || !statusesResponse.data) {
          setIsError(true);
          return;
        }

        const countsByStatusName = new Map<string, number>();
        (statisticsResponse.data ?? []).forEach((item) => {
          countsByStatusName.set(item.status.toLowerCase(), Number(item.count));
        });

        const items: PipelineDataItem[] = statusesResponse.data.items.map((status) => {
          const count = countsByStatusName.get(status.name.toLowerCase()) ?? 0;
          return {
            name: status.name,
            value: count,
            displayValue: String(count),
            color: colorForStage(status.stage),
          };
        });

        setData(items);
      } catch (error) {
        if (!cancelled) {
          console.error('useDealPipeline: failed to load deal pipeline data', error);
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
