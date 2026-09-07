import { useEffect, useState } from 'react';
import { dealAnalyticsService } from '../services/dealAnalyticsService';
import type { ForecastData } from '../types';

export function useDealForecast(pipelineId?: number) {
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const response = await dealAnalyticsService.getForecast(pipelineId);
        if (cancelled) return;
        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }
        setData(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useDealForecast: failed to load forecast', error);
          setIsError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pipelineId]);

  return { data, isLoading, isError };
}
