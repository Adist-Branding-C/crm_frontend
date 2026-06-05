export const AGENT_API_ENDPOINTS = {
  GET_ALL: '/staff',
  CREATE: '/staff',
  UPDATE: (staffId: string) => `/staff/${staffId}`,
  DELETE: (staffId: string) => `/staff/${staffId}`,
};
