export const CAMPAIGN_TASK_API_ENDPOINTS = {
    GET_ALL: '/tasks',
    CREATE: '/tasks/campaign',
    UPDATE: (id) => `/tasks/${id}`,
    DELETE: (id) => `/tasks/${id}`,
};
export const ADD_CAMPAIGN_TASK_INITIAL_VALUES = {
    title: '',
    description: '',
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