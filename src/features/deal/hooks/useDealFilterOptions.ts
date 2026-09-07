import { useState, useEffect, useRef } from 'react';
import { dealFormOptionsService } from '../services/dealFormOptions.service';
import type { LabelValuePair } from '../../../shared/types/common';
import type { UseDealFilterOptionsReturn } from '../types/hook.types';

// Fixed (Phase 5 - deal_type retirement replaced the admin-managed list
// with this two-option category), not fetched.
const TYPE_OPTIONS: LabelValuePair[] = [
  { value: 'Existing', label: 'Existing' },
  { value: 'New', label: 'New' },
];

let cachedStatusOptions: LabelValuePair[] | null = null;
let cachedStaffOptions: LabelValuePair[] | null = null;

export function useDealFilterOptions(): UseDealFilterOptionsReturn {
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>(cachedStatusOptions ?? []);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>(cachedStaffOptions ?? []);
  const [isLoading, setIsLoading] = useState(!cachedStatusOptions || !cachedStaffOptions);
  const hasLoaded = useRef(!!cachedStatusOptions && !!cachedStaffOptions);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const [statusRes, staffRes] = await Promise.all([
          dealFormOptionsService.getStatuses(1, 200),
          dealFormOptionsService.getStaff(1, 100),
        ]);

        const statuses = (statusRes?.data?.items ?? []).map((s: { id: string | number; name?: string; dealStatus?: string }) => ({
          value: String(s.id),
          label: s.name || s.dealStatus || 'Unknown',
        }));

        const staffData = staffRes?.data;
        const staffItems = Array.isArray(staffData) ? staffData : staffData?.items ?? [];
        const staff = staffItems.map((s: { id: string | number; name?: string; fullName?: string; staffName?: string }) => ({
          value: String(s.id),
          label: s.name || s.fullName || s.staffName || 'Unknown',
        }));

        cachedStatusOptions = statuses;
        cachedStaffOptions = staff;

        setStatusOptions(statuses);
        setStaffOptions(staff);
      } catch {
        // silently fail, filters will have no options
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { statusOptions, typeOptions: TYPE_OPTIONS, staffOptions, isLoading };
}
