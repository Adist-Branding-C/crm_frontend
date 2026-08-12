import { useState, useCallback, useRef } from 'react';
import { departmentService } from '../../department/services/department.service';
import type { DepartmentOption } from '../types/agent.types';

/**
 * Fetches and caches department dropdown options for the Add/Edit Staff drawer.
 *
 * Used by:
 * - AgentPage (passed through to AddAgentDrawer)
 *
 * Notes:
 * - Loads once per session; pass force=true to bypass the cache.
 */
export function useAgentDepartmentOptions() {
  const [departmentOptions, setDepartmentOptions] = useState<DepartmentOption[]>([]);
  const departmentsLoaded = useRef(false);

  const fetchDepartments = useCallback(async (force = false) => {
    if (!force && departmentsLoaded.current) return;
    try {
      const response = await departmentService.getAllDepartments({ pageNumber: '1', limit: '100' });

      if (response.status) {
        const data = response.data as { items?: Array<{ departmentName?: string; name?: string; id: number }> } | undefined;
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
