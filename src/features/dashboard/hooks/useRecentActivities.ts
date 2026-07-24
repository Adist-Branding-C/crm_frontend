import { useEffect, useState } from 'react';
import { activityService } from '../../daily-activity/services/ActivityService';
import { ActivityMapper } from '../../daily-activity/mappers/activity.mapper';
import type { Activity } from '../../daily-activity/types';

const RECENT_ACTIVITIES_LIMIT = 5;

export function useRecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await activityService.getActivities({
          pageNumber: 1,
          limit: RECENT_ACTIVITIES_LIMIT,
        });
        if (cancelled) return;
        if (response.status && response.data) {
          setActivities(response.data.items.map(ActivityMapper.toEntity));
        }
      } catch {
        if (!cancelled) setActivities([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { activities, isLoading };
}
