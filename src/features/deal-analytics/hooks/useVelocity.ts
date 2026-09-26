import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, VelocityData } from '../types';

export interface VelocityFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
  stageId?: number | undefined;
}

export function useVelocity(filters: VelocityFilters) {
  const { period, from, to, pipelineId, agentId, stageId } = filters;

  return useReportQuery<VelocityData>(
    () => dealAnalyticsService.getVelocity({ period, from, to, pipelineId, agentId, stageId }),
    [period, from, to, pipelineId, agentId, stageId],
    { hookName: 'useVelocity', fallbackMessage: 'Failed to load deal velocity' },
  );
}
