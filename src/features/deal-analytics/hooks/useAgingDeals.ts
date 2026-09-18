import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AgingDealsData, AgingDealsFilters } from '../types';

export function useAgingDeals(filters: AgingDealsFilters) {
  const { noActivityDays, inStageDays, closeDateExceeded, pipelineId, agentId, pageNumber, limit } = filters;

  return useReportQuery<AgingDealsData>(
    () => dealAnalyticsService.getAgingDeals({ noActivityDays, inStageDays, closeDateExceeded, pipelineId, agentId, pageNumber, limit }),
    [noActivityDays, inStageDays, closeDateExceeded, pipelineId, agentId, pageNumber, limit],
    { hookName: 'useAgingDeals', fallbackMessage: 'Failed to load aging deals' },
  );
}
