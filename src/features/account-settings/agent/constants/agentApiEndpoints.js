// Staff CRUD routes consumed by agent.service.ts (account-settings/agent "Staff" tab).
export const AGENT_API_ENDPOINTS = {
    GET_ALL: '/staff',
    CREATE: '/staff',
    UPDATE: (staffId) => `/staff/${staffId}`,
    DELETE: (staffId) => `/staff/${staffId}`,
};
//# sourceMappingURL=agentApiEndpoints.js.map