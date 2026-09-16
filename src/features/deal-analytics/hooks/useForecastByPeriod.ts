import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { ForecastByPeriodData, ReportPeriod } from '../types';

export interface ForecastByPeriodFilters {
  period: ReportPeriod;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
}

export function useForecastByPeriod(filters: ForecastByPeriodFilters) {
  const { period, from, to, pipelineId, agentId } = filters;

  return useReportQuery<ForecastByPeriodData>(
    () => dealAnalyticsService.getForecastByPeriod({ period, from, to, pipelineId, agentId }),
    [period, from, to, pipelineId, agentId],
    { hookName: 'useForecastByPeriod', fallbackMessage: 'Failed to load the forecast' },
  );
}
