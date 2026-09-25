import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, SizeDistributionData } from '../types';

export interface SizeDistributionFilters {
  currency?: string | undefined;
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
}

export function useSizeDistribution(filters: SizeDistributionFilters) {
  const { currency, period, from, to, pipelineId } = filters;

  return useReportQuery<SizeDistributionData>(
    () => dealAnalyticsService.getSizeDistribution({ currency, period, from, to, pipelineId }),
    [currency, period, from, to, pipelineId],
    { hookName: 'useSizeDistribution', fallbackMessage: 'Failed to load the size distribution' },
  );
}
