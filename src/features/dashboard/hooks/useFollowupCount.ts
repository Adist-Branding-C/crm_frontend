import { useEffect, useState } from 'react';
import { dashboardService } from '../services/DashboardService';

export function useFollowupCount() {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const response = await dashboardService.getFollowupCount({ limit: 1 });
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setTotal(response.data.pagination.total);
      } catch (error) {
        if (!cancelled) {
          console.error('useFollowupCount: failed to load followup count', error);
          setIsError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { total, isLoading, isError };
}
