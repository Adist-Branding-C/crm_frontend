import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { StageFunnelData } from '../types';

export function useStageFunnel(pipelineId?: number) {
  return useReportQuery<StageFunnelData>(
    () => dealAnalyticsService.getStageFunnel(pipelineId),
    [pipelineId],
    { hookName: 'useStageFunnel', fallbackMessage: 'Failed to load the stage funnel' },
  );
}
