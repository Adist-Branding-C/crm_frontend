import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { StaffOption } from '../types/options';

export function useStaffOptions() {
  const fetchStaff = useCallback(async (): Promise<StaffOption[]> => {
    const staffRes = await taskService.getStaff();
    if (staffRes.status && staffRes.data?.items) {
      return staffRes.data.items.map((s: { id: number; name: string }) => ({ value: s.id, label: s.name }));
    }
    return [];
  }, []);

  const { options: staffOptions, isLoading: staffLoading, load: loadStaff } = useLookupOptions(fetchStaff);

  return { staffOptions, staffLoading, loadStaff };
}
