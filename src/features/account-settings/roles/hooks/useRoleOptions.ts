import { useState, useCallback, useRef } from 'react';
import { roleService } from '../services/role.service';
import type { RoleOption } from '../types/role.types';

/**
 * Fetches and caches role dropdown options for the Add/Edit Staff drawer.
 *
 * Used by:
 * - AgentPage (passed through to AddAgentDrawer for the Role field)
 *
 * Notes:
 * - Loads once per session; pass force=true to bypass the cache.
 */
export function useRoleOptions() {
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
  const rolesLoaded = useRef(false);

  const fetchRoles = useCallback(async (force = false) => {
    if (!force && rolesLoaded.current) return;
    try {
      const response = await roleService.getAllRoles({ pageNumber: '1', limit: '100' });

      if (response.status) {
        const data = response.data as { items?: Array<{ roleName?: string; name?: string; id: number }> } | undefined;
        const items = Array.isArray(data?.items) ? data.items : [];
        setRoleOptions(
          items.map((item) => ({
            label: item.roleName || item.name || '',
            value: String(item.id),
          }))
        );
        rolesLoaded.current = true;
      }
    } catch {
      setRoleOptions([]);
    }
  }, []);

  return { roleOptions, fetchRoles };
}
