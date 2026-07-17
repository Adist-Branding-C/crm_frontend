/**
 * REST endpoints for deal status CRUD.
 *
 * Used by:
 * - dealStatus.service.ts
 */
export const DEAL_STATUS_API_ENDPOINTS = {
  GET_ALL: '/deal-settings/status',
  GET_ONE: (id: number) => `/deal-settings/status/${id}`,
  CREATE: '/deal-settings/status',
  UPDATE: (id: number) => `/deal-settings/status/${id}`,
  DELETE: (id: number) => `/deal-settings/status/${id}`,
};
