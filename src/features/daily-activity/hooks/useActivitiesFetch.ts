import { useState, useCallback, useRef } from 'react';
import type { AxiosError } from 'axios';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import { activityService } from '../services/ActivityService';
import { ActivityMapper } from '../mappers/activity.mapper';
import type { Activity, Filters, PaginationInfo } from '../types';

export function useActivitiesFetch(onError: (message: string) => void) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const requestSeqRef = useRef(0);
  const rowsPerPage = DEFAULT_ROWS_PER_PAGE;

  const fetchActivities = useCallback(async (page: number, filters: Filters, activityType: string) => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
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
    } catch (error) {
      if (requestSeq !== requestSeqRef.current) return;
      setActivities([]);
      setPagination(null);
      onError(
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        'Failed to load activities. Please check your connection.',
      );
    } finally {
      if (requestSeq === requestSeqRef.current) setIsLoading(false);
    }
  }, [rowsPerPage, onError]);

  return { activities, pagination, rowsPerPage, isLoading, fetchActivities };
}
