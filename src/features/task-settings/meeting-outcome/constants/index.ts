export const MEETING_OUTCOME_API_ENDPOINTS = {
  GET_ALL: '/meeting-outcome',
  CREATE: '/meeting-outcome',
  UPDATE: (id: number) => `/meeting-outcome/${id}`,
  DELETE: (id: number) => `/meeting-outcome/${id}`,
};

export const ADD_MEETING_OUTCOME_INITIAL_VALUES = {
  name: '',
  status: '',
};
