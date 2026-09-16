import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { ForecastData } from '../types';

export function useDealForecast(pipelineId?: number) {
  return useReportQuery<ForecastData>(
    () => dealAnalyticsService.getForecast(pipelineId),
    [pipelineId],
    { hookName: 'useDealForecast', fallbackMessage: 'Failed to load the forecast' },
  );
}
