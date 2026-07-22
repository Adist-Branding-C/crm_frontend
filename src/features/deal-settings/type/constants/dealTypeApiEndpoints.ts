/**
 * REST endpoints for deal type CRUD.
 *
 * Used by:
 * - dealType.service.ts
 */
export const DEAL_TYPE_API_ENDPOINTS = {
  GET_ALL: '/deal-settings/types',
  GET_ONE: (id: number) => `/deal-settings/types/${id}`,
  CREATE: '/deal-settings/types',
  UPDATE: (id: number) => `/deal-settings/types/${id}`,
  DELETE: (id: number) => `/deal-settings/types/${id}`,
};
