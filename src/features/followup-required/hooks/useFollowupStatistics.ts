import { useCallback, useEffect, useState } from 'react';
import { followupService } from '../services/followupService';
import type { FollowupStatistics } from '../types';

/**
 * Fetches the Overdue/Due Today/Upcoming/Total counts shown by
 * FollowupStatCards. Pure data hook - fetch/loading/error only, no
 * bucket-selection state (that's owned by the page, since it also drives
 * the leads list fetch).
 *
 * Used by:
 * - FollowupRequiredPage.
 */
export function useFollowupStatistics() {
  const [data, setData] = useState<FollowupStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await followupService.getFollowupStatistics();
      if (response.status && response.data) {
        setData(response.data);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return { data, isLoading, isError, refetch: fetchStatistics };
}
