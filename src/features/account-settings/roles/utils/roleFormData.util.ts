import { MODULES, PERMISSIONS, type ModulePermissions } from '../../../../shared/constants/modules';
import { buildEmptyPermissions } from '../constants/role.constants';
import type { RoleFormData, RoleItem } from '../types/role.types';

/**
 * True when at least one module/permission is selected across the whole matrix.
 *
 * Used by:
 * - AddRoleDrawer (disables Save until a permission is chosen)
 * - useRole (defensive guard before create/update)
 */
export function hasSelectedPermission(permissions: ModulePermissions): boolean {
  return Object.values(permissions).some((perms) =>
    PERMISSIONS.some((permission) => perms?.[permission])
  );
}

/**
 * Number of modules that have at least one permission selected.
 *
 * Used by:
 * - AddRoleDrawer ("No. of Modules Assigned" style feedback is computed on the backend; this
 *   utility is available for client-side counts if ever needed)
 */
export function countSelectedModules(permissions: ModulePermissions): number {
  return Object.values(permissions).filter((perms) =>
    PERMISSIONS.some((permission) => perms?.[permission])
  ).length;
}

/**
 * Merges a role item's stored permissions over the full blank matrix.
 *
 * Used by:
 * - useRoleDrawer (edit-mode initial values)
 *
 * Notes:
 * - Starts from buildEmptyPermissions() so every module/key exists, then overlays whatever the
 *   role actually has. Only truthy grants are copied, so stale keys never leak into the form.
 */
export function buildFormPermissions(item: RoleItem): ModulePermissions {
  const base = buildEmptyPermissions();
  const stored = item.permissions ?? {};
  MODULES.forEach((module) => {
    const moduleGrants = stored?.[module.key];
    const baseModule = base[module.key];
    if (!moduleGrants || !baseModule) return;
    PERMISSIONS.forEach((permission) => {
      if (moduleGrants[permission]) {
        baseModule[permission] = true;
      }
    });
  });
  return base;
}

/**
 * Builds the Formik initial values for a role, adding an empty roleName if editing.
 */
export function buildRoleInitialValues(item: RoleItem | null): RoleFormData {
  return {
    roleName: item ? item.roleName || item.name || '' : '',
    canAccessWeb: item ? item.canAccessWeb ?? false : false,
    permissions: item ? buildFormPermissions(item) : buildEmptyPermissions(),
  };
}
