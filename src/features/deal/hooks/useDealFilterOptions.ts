import { useState, useEffect, useRef } from 'react';
import { dealFormOptionsService } from '../services/dealFormOptions.service';
import type { LabelValuePair } from '../../../shared/types/common';
import type { UseDealFilterOptionsReturn } from '../types/hook.types';

let cachedStatusOptions: LabelValuePair[] | null = null;
let cachedTypeOptions: LabelValuePair[] | null = null;
let cachedStaffOptions: LabelValuePair[] | null = null;

export function useDealFilterOptions(): UseDealFilterOptionsReturn {
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>(cachedStatusOptions ?? []);
  const [typeOptions, setTypeOptions] = useState<LabelValuePair[]>(cachedTypeOptions ?? []);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>(cachedStaffOptions ?? []);
  const [isLoading, setIsLoading] = useState(!cachedStatusOptions || !cachedTypeOptions || !cachedStaffOptions);
  const hasLoaded = useRef(!!cachedStatusOptions && !!cachedTypeOptions && !!cachedStaffOptions);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const [statusRes, typeRes, staffRes] = await Promise.all([
          dealFormOptionsService.getStatuses(1, 100),
          dealFormOptionsService.getTypes(1, 100),
          dealFormOptionsService.getStaff(1, 100),
        ]);

        const statuses = (statusRes?.data?.items ?? []).map((s: { id: string | number; name?: string; dealStatus?: string }) => ({
          value: String(s.id),
          label: s.name || s.dealStatus || 'Unknown',
        }));

        const types = (typeRes?.data?.items ?? []).map((t: { id: string | number; name?: string; dealType?: string }) => ({
          value: String(t.id),
          label: t.name || t.dealType || 'Unknown',
        }));

        const staffData = staffRes?.data;
        const staffItems = Array.isArray(staffData) ? staffData : staffData?.items ?? [];
        const staff = staffItems.map((s: { id: string | number; name?: string; fullName?: string; staffName?: string }) => ({
          value: String(s.id),
          label: s.name || s.fullName || s.staffName || 'Unknown',
        }));

        cachedStatusOptions = statuses;
        cachedTypeOptions = types;
        cachedStaffOptions = staff;

        setStatusOptions(statuses);
        setTypeOptions(types);
        setStaffOptions(staff);
      } catch {
        // silently fail, filters will have no options
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { statusOptions, typeOptions, staffOptions, isLoading };
}
