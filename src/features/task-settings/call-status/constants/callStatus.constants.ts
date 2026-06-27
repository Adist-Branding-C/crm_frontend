export const CALL_STATUS_API_ENDPOINTS = {
  GET_ALL: '/call-status',
  CREATE: '/call-status',
  UPDATE: (id: number) => `/call-status/${id}`,
  DELETE: (id: number) => `/call-status/${id}`,
};

export const ADD_CALL_STATUS_INITIAL_VALUES = {
  name: '',
  status: '',
};
