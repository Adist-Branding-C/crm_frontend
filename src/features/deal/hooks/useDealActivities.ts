import { useState, useEffect, useCallback } from 'react';
import type { AxiosError } from 'axios';
import { activityService } from '../../enquiries/services/activityService';
import type { ActivityItem } from '../../enquiries/types';

/**
 * Deal-scoped activity feed for the "Activity" tab in DealDetailContent -
 * mirrors useLeadActivities exactly, pointed at the same generic
 * `/activities` endpoint with entityType 'deal' instead of 'lead'.
 *
 * Used by:
 * - DealDetailContent
 */
export function useDealActivities(
  dealId: number | undefined,
  isOpen: boolean,
  activeTab?: string,
) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const isActivityTabActive = activeTab === undefined || activeTab === 'activity';
  const shouldFetch = isOpen && !!dealId && isActivityTabActive;

  useEffect(() => {
    if (!isOpen || !dealId) {
      setActivities([]);
      setError(null);
      return;
    }

    if (!shouldFetch) return;

    let cancelled = false;

    const fetchActivities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await activityService.getActivities({
          entityType: 'deal',
          entityId: String(dealId),
        });

        if (!cancelled) {
          const items = response?.data?.items ?? [];
          setActivities(items);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
            'Failed to fetch activities',
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchActivities();

    return () => {
      cancelled = true;
    };
  }, [dealId, isOpen, shouldFetch, refreshKey]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { activities, isLoading, error, refresh };
}
