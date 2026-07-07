// Branch CRUD routes consumed by branch.service.ts (account-settings/branch "Branch" tab).
export const BRANCH_API_ENDPOINTS = {
  GET_ALL: '/branch',
  CREATE: '/branch',
  UPDATE: (id: number) => `/branch/${id}`,
  DELETE: (id: number) => `/branch/${id}`,
};
