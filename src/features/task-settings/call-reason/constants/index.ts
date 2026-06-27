export const CALL_REASON_API_ENDPOINTS = {
  GET_ALL: '/call-reason',
  CREATE: '/call-reason',
  UPDATE: (id: number) => `/call-reason/${id}`,
  DELETE: (id: number) => `/call-reason/${id}`,
};

export const ADD_CALL_REASON_INITIAL_VALUES = {
  name: '',
  status: '',
};
