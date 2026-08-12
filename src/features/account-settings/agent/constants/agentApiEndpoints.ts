// Staff CRUD routes consumed by agent.service.ts (account-settings/agent "Staff" tab).
export const AGENT_API_ENDPOINTS = {
  GET_ALL: '/staff',
  CREATE: '/staff',
  UPDATE: (staffId: string) => `/staff/${staffId}`,
  DELETE: (staffId: string) => `/staff/${staffId}`,
  DELETION_DEPENDENCIES: (staffId: string) => `/staff/${staffId}/deletion-dependencies`,
  REASSIGN_LEADS: (staffId: string) => `/staff/${staffId}/reassign-leads`,
  RESOLVE_TASKS: (staffId: string) => `/staff/${staffId}/resolve-tasks`,
  REMOVE_AUTOMATION_REFERENCES: (staffId: string) => `/staff/${staffId}/remove-automation-references`,
  ME: '/staff/me',
};
