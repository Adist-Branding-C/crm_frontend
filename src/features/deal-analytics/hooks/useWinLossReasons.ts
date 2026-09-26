import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, WinLossReasonsData } from '../types';

export interface WinLossReasonsFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
}

export function useWinLossReasons(filters: WinLossReasonsFilters) {
  const { period, from, to, pipelineId, agentId } = filters;

  return useReportQuery<WinLossReasonsData>(
    () => dealAnalyticsService.getWinLossReasons({ period, from, to, pipelineId, agentId }),
    [period, from, to, pipelineId, agentId],
    { hookName: 'useWinLossReasons', fallbackMessage: 'Failed to load the win/loss breakdown' },
  );
}
