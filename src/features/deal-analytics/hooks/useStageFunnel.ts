import { useEffect, useState } from 'react';
import { dealAnalyticsService } from '../services/dealAnalyticsService';
import type { StageFunnelData } from '../types';

export function useStageFunnel(pipelineId?: number) {
  const [data, setData] = useState<StageFunnelData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const response = await dealAnalyticsService.getStageFunnel(pipelineId);
        if (cancelled) return;
        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }
        setData(response.data);
      } catch (error) {
        if (!cancelled) {
          console.error('useStageFunnel: failed to load stage funnel', error);
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
