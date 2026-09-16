import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, SourceConversionRow } from '../types';

export interface SourceConversionFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  sourceIds?: string | undefined;
}

export function useSourceConversion(filters: SourceConversionFilters) {
  const { period, from, to, pipelineId, sourceIds } = filters;

  return useReportQuery<SourceConversionRow[]>(
    () => dealAnalyticsService.getSourceConversion({ period, from, to, pipelineId, sourceIds }),
    [period, from, to, pipelineId, sourceIds],
    { hookName: 'useSourceConversion', fallbackMessage: 'Failed to load conversion by source' },
  );
}
