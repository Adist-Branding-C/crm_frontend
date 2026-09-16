import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, OwnerLeaderboardRow } from '../types';

export interface OwnerLeaderboardFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
}

export function useOwnerLeaderboard(filters: OwnerLeaderboardFilters) {
  const { period, from, to, pipelineId } = filters;

  return useReportQuery<OwnerLeaderboardRow[]>(
    () => dealAnalyticsService.getOwnerLeaderboard({ period, from, to, pipelineId }),
    [period, from, to, pipelineId],
    { hookName: 'useOwnerLeaderboard', fallbackMessage: 'Failed to load the leaderboard' },
  );
}
