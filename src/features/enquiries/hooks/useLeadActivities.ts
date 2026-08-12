import { useState, useEffect } from 'react';
import type { AxiosError } from 'axios';
import { activityService } from '../services/activityService';
import { ERROR_MESSAGES } from '../constants/messages';
import type { ActivityItem } from '../types';

export function useLeadActivities(leadId: number | undefined, isOpen: boolean) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !leadId) {
      setActivities([]);
      setError(null);
      return;
    }

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
  }, [leadId, isOpen]);

  return { activities, isLoading, error };
}
