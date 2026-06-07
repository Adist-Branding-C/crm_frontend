export const TASK_CATEGORY_API_ENDPOINTS = {
  GET_ALL: '/task-category',
  CREATE: '/task-category',
  UPDATE: (id: number) => `/task-category/${id}`,
  DELETE: (id: number) => `/task-category/${id}`,
};

export const ADD_TASK_CATEGORY_INITIAL_VALUES = {
  category: '',
  action: '',
};
