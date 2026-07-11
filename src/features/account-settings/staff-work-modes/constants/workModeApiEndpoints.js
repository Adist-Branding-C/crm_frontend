// Work mode CRUD routes consumed by workMode.service.ts (account-settings/staff-work-modes tab).
export const WORK_MODE_API_ENDPOINTS = {
    GET_ALL: '/work-mode',
    CREATE: '/work-mode',
    UPDATE: (id) => `/work-mode/${id}`,
    DELETE: (id) => `/work-mode/${id}`,
};
//# sourceMappingURL=workModeApiEndpoints.js.map