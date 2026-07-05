import { useState, useCallback, useRef } from 'react';
import { taskService } from '../services/taskService';
import type { StaffOption } from '../types/genericTaskForm.types';

export function useStaffOptions() {
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const staffLoaded = useRef(false);

  const loadStaff = useCallback(async () => {
    if (staffLoaded.current) return;
    staffLoaded.current = true;
    setStaffLoading(true);
    try {
      const staffRes = await taskService.getStaff();
      if (staffRes.status && staffRes.data?.items) {
        setStaffOptions(
          staffRes.data.items.map((s: { id: number; name: string }) => ({ value: s.id, label: s.name }))
        );
      }
    } catch {
      staffLoaded.current = false;
    } finally {
      setStaffLoading(false);
    }
  }, []);

  return { staffOptions, staffLoading, loadStaff };
}
