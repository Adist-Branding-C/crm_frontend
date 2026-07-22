import { useState, useCallback, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import { activityService } from '../services/ActivityService';
import { ActivityMapper } from '../mappers/activity.mapper';
import type { Activity, Filters, PaginationInfo } from '../types';

/**
 * Fetches a page of activities for the given filters, and holds the resulting
 * activities + pagination state.
 *
 * Used by:
 * - useDailyActivityData (calls fetchActivities on mount, apply, reset, and
 *   page-change).
 *
 * Notes:
 * - fetchActivities is imperative rather than reactive-on-filter-change, since
 *   the filter panel uses an explicit "Apply" action rather than live refetch
 *   on every field edit - see useDailyActivityData for why the shared
 *   useTableData hook (which auto-refetches on state change) wasn't used here.
 * - requestSeqRef discards responses for requests that are no longer the most
 *   recent in-flight one (e.g. a fast page click superseding a slow one).
 */
export function useActivitiesFetch(onError: (message: string) => void) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const requestSeqRef = useRef(0);
  const rowsPerPage = DEFAULT_ROWS_PER_PAGE;

  const fetchActivities = useCallback(async (page: number, filters: Filters, activityType: string) => {
    const requestSeq = ++requestSeqRef.current;
    try {
      const params = ActivityMapper.toActivitiesRequest(
        page,
        rowsPerPage,
        new Date().getTimezoneOffset(),
        filters,
        activityType,
      );
      const response = await activityService.getActivities(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status && response.data) {
        setActivities(response.data.items.map(ActivityMapper.toEntity));
        setPagination(response.data.pagination);
      } else {
        setActivities([]);
        setPagination(null);
        onError(response.message || 'Failed to load activities');
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setActivities([]);
      setPagination(null);
      onError('Failed to load activities. Please check your connection.');
    }
  }, [rowsPerPage, onError]);

  return { activities, pagination, rowsPerPage, fetchActivities };
}
