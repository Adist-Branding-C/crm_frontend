// Designation CRUD routes consumed by designation.service.ts (account-settings/designations tab and agent's designation dropdown).
export const DESIGNATION_API_ENDPOINTS = {
    GET_ALL: '/designation',
    CREATE: '/designation',
    UPDATE: (id) => `/designation/${id}`,
    DELETE: (id) => `/designation/${id}`,
};
//# sourceMappingURL=designationApiEndpoints.js.map