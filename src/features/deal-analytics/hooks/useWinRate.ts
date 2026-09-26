import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { useReportQuery } from './useReportQuery';
import type { AnalyticsPeriod, WinRateData } from '../types';

export function useWinRate(period: AnalyticsPeriod, from?: string, to?: string) {
  const isIncompleteCustomRange = period === 'custom' && (!from || !to);
  const rangeFrom = period === 'custom' ? from : undefined;
  const rangeTo = period === 'custom' ? to : undefined;

  return useReportQuery<WinRateData>(
    () => dealAnalyticsService.getWinRate(period, rangeFrom, rangeTo),
    [period, rangeFrom, rangeTo],
    { hookName: 'useWinRate', fallbackMessage: 'Failed to load the win rate', skip: isIncompleteCustomRange },
  );
}
