import { useState, useEffect, useCallback } from 'react';
import type { AxiosError } from 'axios';
import { activityService } from '../services/activityService';
import { ERROR_MESSAGES } from '../constants/messages';
import type { ActivityItem } from '../types';


export function useLeadActivities(
  leadId: number | undefined,
  isOpen: boolean,
  activeTab?: string,
) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const isActivityTabActive = activeTab === undefined || activeTab === 'activity';
  const shouldFetch = isOpen && !!leadId && isActivityTabActive;

  useEffect(() => {
    if (!isOpen || !leadId) {
      setActivities([]);
      setError(null);
      return;
    }

    if (!shouldFetch) return;

    let cancelled = false;

    const fetchActivities = async () => {
      setIsLoading(true);
      setError(null);

      const entityId = String(leadId);

      try {
        const response = await activityService.getActivities({
          entityType: 'lead',
          entityId,
        });

        if (!cancelled) {
          const items = response?.data?.items ?? [];
          setActivities(items);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
            ERROR_MESSAGES.FETCH_ACTIVITIES,
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
  }, [leadId, isOpen, shouldFetch, refreshKey]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { activities, isLoading, error, refresh };
}
