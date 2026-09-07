import { useEffect, useState } from 'react';
import { dealAnalyticsService } from '../services/dealAnalyticsService';
import type { AnalyticsPeriod, OwnerLeaderboardRow } from '../types';

export function useOwnerLeaderboard(period: AnalyticsPeriod, from?: string, to?: string) {
  const [data, setData] = useState<OwnerLeaderboardRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setData([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const response = await dealAnalyticsService.getOwnerLeaderboard(period, from, to);
        if (cancelled) return;
        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }
        setData(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useOwnerLeaderboard: failed to load owner leaderboard', error);
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
