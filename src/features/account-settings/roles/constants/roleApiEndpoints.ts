/**
 * Role CRUD API endpoints consumed by role.service.ts (account-settings/roles).
 *
 * Notes:
 * - GET_ALL points at the custom role catalog (/role/custom), which is the
 *   paginated endpoint that returns roles actually created via the "Add Role"
 *   form (id, name, permissions, createdAt, pagination metadata).
 * - CREATE/UPDATE/DELETE use the plain /role endpoints, which the backend
 *   maps to the role database for create/update/delete operations.
 */
export const ROLE_API_ENDPOINTS = {
  GET_ALL: '/role/custom',
  CREATE: '/role',
  UPDATE: (id: string) => `/role/${id}`,
  DELETE: (id: string) => `/role/${id}`,
};
