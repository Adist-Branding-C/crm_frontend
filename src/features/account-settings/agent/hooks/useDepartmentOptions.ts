import { useState, useCallback, useRef } from 'react';
import { departmentApiService } from '../../department/services';
import type { DepartmentOption } from '../types';

export function useDepartmentOptions() {
  const [departmentOptions, setDepartmentOptions] = useState<DepartmentOption[]>([]);
  const departmentsLoaded = useRef(false);

  const fetchDepartments = useCallback(async (force = false) => {
    if (!force && departmentsLoaded.current) return;
    try {
      const response = await departmentApiService.fetchAll({ pageNumber: '1', limit: '100' });
      if (response.status) {
        const data = response.data as { items?: Array<{ departmentName?: string; name?: string; id: number }> };
        const items = Array.isArray(data?.items) ? data.items : [];
        setDepartmentOptions(
          items.map((item) => ({
            label: item.departmentName || item.name || '',
            value: String(item.id),
          }))
        );
        departmentsLoaded.current = true;
      }
    } catch {
      setDepartmentOptions([]);
    }
  }, []);

  return { departmentOptions, fetchDepartments };
}
