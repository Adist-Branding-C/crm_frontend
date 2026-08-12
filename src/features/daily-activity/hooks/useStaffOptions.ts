import { useState, useEffect, useCallback } from 'react';
import { activityService } from '../services/ActivityService';
import { ActivityMapper } from '../mappers/activity.mapper';
import { ALL_STAFF_OPTION } from '../constants';
import type { StaffOption } from '../types';

/**
 * Fetches the staff list for the activity filter's staff dropdown.
 *
 * Used by:
 * - DailyActivityPage (composed alongside useSearchFilter for the dropdown).
 *
 * Notes:
 * - Failure is non-fatal: the "All Staff" option still works without the live list.
 */
export function useStaffOptions(onError: (message: string) => void) {
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF_OPTION]);

  const fetchStaffOptions = useCallback(async (searchQuery?: string) => {
    try {
      const response = await activityService.getStaffOptions(searchQuery);
      if (response.status && response.data) {
        setStaffOptions([ALL_STAFF_OPTION, ...response.data.items.map(ActivityMapper.toStaffOption)]);
      }
    } catch {
      onError('Failed to load staff list for filtering');
    }
  }, [onError]);

  return { staffOptions, fetchStaffOptions };
}
