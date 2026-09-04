import type { RoleFormData, RolePayload } from '../types/role.types';

export class RoleMapper {
  /**
   * Maps the Formik role shape to the server-ready payload.
   *
   * Used by:
   * - role.service.ts (create/update)
   *
   * Notes:
   * - Keeps the payload contract isolated in one place so the wire format only needs to be
   *   adjusted here once the backend field names are confirmed.
   */
  static toPayload(data: RoleFormData): RolePayload {
    return {
      roleName: data.roleName.trim(),
      canAccessWeb: data.canAccessWeb,
      permissions: data.permissions,
    };
  }
}
