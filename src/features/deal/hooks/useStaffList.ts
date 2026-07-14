import { useCallback } from 'react';
import { useAsyncOptions } from '../../../shared/hooks/useAsyncOptions';
import { staffService } from '../services/staff.service';
import type { StaffOption } from '../types';

interface StaffApiItem {
  id: string | number;
  name: string;
}

export function useStaffList() {
  const fetchStaffItems = useCallback(async (): Promise<StaffApiItem[]> => {
    const response = await staffService.getStaff();
    const data = (response as { data?: unknown })?.data ?? response ?? [];
    return Array.isArray(data) ? (data as StaffApiItem[]) : [];
  }, []);

  const mapToOption = useCallback((s: StaffApiItem): StaffOption => ({ label: s.name, value: s.id }), []);

  const { options: staff, isLoading } = useAsyncOptions(fetchStaffItems, mapToOption);

  return { staff, isLoading };
}
