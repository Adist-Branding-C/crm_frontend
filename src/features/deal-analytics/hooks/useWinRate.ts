import { useEffect, useState } from 'react';
import { dealAnalyticsService } from '../services/dealAnalyticsService';
import type { AnalyticsPeriod, WinRateData } from '../types';

export function useWinRate(period: AnalyticsPeriod, from?: string, to?: string) {
  const [data, setData] = useState<WinRateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setData(null);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    const rangeFrom = period === 'custom' ? from : undefined;
    const rangeTo = period === 'custom' ? to : undefined;

    (async () => {
      try {
        const response = await dealAnalyticsService.getWinRate(period, rangeFrom, rangeTo);
        if (cancelled) return;
        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }
        setData(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useWinRate: failed to load win rate', error);
          setIsError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [period, from, to]);

  return { data, isLoading, isError };
}
