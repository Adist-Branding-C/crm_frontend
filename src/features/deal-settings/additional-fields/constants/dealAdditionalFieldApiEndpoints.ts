/**
 * REST endpoints for deal additional-field CRUD.
 *
 * Used by:
 * - dealAdditionalField.service.ts
 */
export const DEAL_ADDITIONAL_FIELD_API_ENDPOINTS = {
  GET_ALL: '/deal-settings/additional-fields',
  GET_ONE: (id: string) => `/deal-settings/additional-fields/${id}`,
  CREATE: '/deal-settings/additional-fields',
  UPDATE: (id: string) => `/deal-settings/additional-fields/${id}`,
  DELETE: (id: string) => `/deal-settings/additional-fields/${id}`,
};
