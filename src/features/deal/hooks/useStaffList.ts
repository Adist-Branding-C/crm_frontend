import { useState, useEffect } from 'react';
import { staffService } from '../services/staff.service';
import { getErrorMessage } from '../../../shared/utils/error';
import type { StaffOption } from '../types';

export function useStaffList() {
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    staffService.getStaff()
      .then((response) => {
        const data = response?.data;
        const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
        setStaff(items.map((s: any) => ({ label: s.name, value: s.id, staffId: s.staff_id })));
      })
      .catch((err) => {
        setStaff([]);
        setError(getErrorMessage(err, 'Failed to load staff'));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { staff, isLoading, error };
}
