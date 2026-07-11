export const TASK_API_ENDPOINTS = {
    GET_ALL: '/tasks',
    CREATE: '/tasks',
    UPDATE: (id) => `/tasks/${id}`,
    DELETE: (id) => `/tasks/${id}`,
};
export const ADD_TASK_INITIAL_VALUES = {
    title: '',
    description: '',
    categoryId: '',
    scheduledDate: '',
    scheduledTime: '',
    assignedTo: '',
    leadId: '',
    priority: '',
    status: '',
};
export { PRIORITY_OPTIONS } from '../../shared/constants/priorityOptions';
export { STATUS_OPTIONS } from '../../shared/constants/statusOptions';
//# sourceMappingURL=index.js.map