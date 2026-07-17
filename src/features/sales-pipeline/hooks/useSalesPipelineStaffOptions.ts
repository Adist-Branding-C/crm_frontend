import { useState, useEffect } from 'react';
import { staffService } from '../../deal/services/staff.service';
import type { Agent } from '../types';

interface StaffListItem {
  staff_id: string;
  name: string;
}


export function useSalesPipelineStaffOptions() {
  const [staffOptions, setStaffOptions] = useState<Agent[]>([]);

  useEffect(() => {
    let cancelled = false;
    staffService
      .getStaff()
      .then(
        (response: { status: boolean; data?: { items?: StaffListItem[] } }) => {
          if (cancelled || !response.status || !response.data?.items) return;
          setStaffOptions(
            response.data.items.map((s) => ({ id: s.staff_id, name: s.name })),
          );
        },
      )
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return { staffOptions };
}
