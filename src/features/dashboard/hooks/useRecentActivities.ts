import { useEffect, useState } from 'react';
import { activityService } from '../../daily-activity/services/ActivityService';
import { ActivityMapper } from '../../daily-activity/mappers/activity.mapper';
import type { Activity, GetActivitiesParams } from '../../daily-activity/types';
import type { DashboardPeriod } from '../types';

const RECENT_ACTIVITIES_LIMIT = 5;

export function useRecentActivities(period: DashboardPeriod, from?: string, to?: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (period === 'custom' && (!from || !to)) {
      setActivities([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const params: Partial<GetActivitiesParams> = {
          pageNumber: 1,
          limit: RECENT_ACTIVITIES_LIMIT,
          period,
        };
        if (period === 'custom') {
          if (from) params.from = from;
          if (to) params.to = to;
        }

        const response = await activityService.getActivities(params);
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
  }, [period, from, to]);

  return { activities, isLoading };
}
