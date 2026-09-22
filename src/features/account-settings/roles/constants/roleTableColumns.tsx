import { PERMISSIONS, type ModulePermissions } from '../../../../shared/constants/modules';
import type { Column } from '../../../../shared/types/crud';
import { formatDate } from '../../../../shared/utils/dateUtils';
import type { RoleItem } from '../types/role.types';

/**
 * Number of modules a role has at least one permission on.
 *
 * Used by:
 * - ROLE_TABLE_COLUMNS ("No. of Modules Assigned" column)
 *
 * Notes:
 * - Prefers the backend-supplied count (module_count/modulesAssigned/assignedModules) and only
 *   falls back to counting the permission matrix when that count is absent.
 */
function getModuleCount(item: RoleItem): number {
  if (item.module_count !== undefined) return item.module_count;
  if (item.modulesAssigned !== undefined) return item.modulesAssigned;
  if (item.assignedModules !== undefined) return item.assignedModules;
  const permissions: ModulePermissions = item.permissions ?? {};
  return Object.values(permissions).filter((perms) =>
    PERMISSIONS.some((permission) => perms?.[permission])
  ).length;
}

// Static column config for RolePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const ROLE_TABLE_COLUMNS: Column<RoleItem>[] = [
  { key: 'roleName', label: 'Role Name', render: (item) => item.roleName || item.name || '-' },
  { key: 'modules', label: 'No. of Modules Assigned', render: (item) => getModuleCount(item) },
  {
    key: 'createdDate',
    label: 'Created Date',
    render: (item) => formatDate(item.created_at || item.createdAt || item.created_date),
  },
];
