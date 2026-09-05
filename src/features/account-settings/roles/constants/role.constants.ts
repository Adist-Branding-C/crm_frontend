import { MODULES, type ModulePermissions, type PermissionKey } from '../../../../shared/constants/modules';
import type { RoleFormData } from '../types/role.types';

/**
 * Builds a blank permission matrix where every module starts with all permissions unchecked.
 *
 * Used by:
 * - ADD_ROLE_INITIAL_VALUES (and the drawer's edit-mode pre-fill)
 *
 * Notes:
 * - Derived from the centralized MODULES config, so new modules (and their keys) are
 *   picked up automatically — nothing here needs to know module names by heart.
 */
export function buildEmptyPermissions(): ModulePermissions {
  const permissions: ModulePermissions = {};
  MODULES.forEach((module) => {
    const modulePerms: Record<PermissionKey, boolean> = {
      create: false,
      read: false,
      edit: false,
      delete: false,
    };
    permissions[module.key] = modulePerms;
  });
  return permissions;
}

// Blank Formik initial state for AddRoleDrawer's "add" mode (account-settings/roles).
export const ADD_ROLE_INITIAL_VALUES: RoleFormData = {
  roleName: '',
  canAccessWeb: false,
  permissions: buildEmptyPermissions(),
};
