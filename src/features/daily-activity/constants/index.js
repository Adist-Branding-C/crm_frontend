import { formatActivityType } from '../utils/activityHelpers';
export const staffList = [
    { id: 1, name: 'All Staff' },
    { id: 2, name: 'Rameesa' },
    { id: 3, name: 'Ameen' },
    { id: 4, name: 'Shameena' },
    { id: 5, name: 'Junaid' },
    { id: 6, name: 'Fathima' },
    { id: 7, name: 'Fida Fathima' },
    { id: 8, name: 'Nandana K' },
    { id: 9, name: 'Aysha' },
    { id: 10, name: 'Nesri' },
];
const ACTIVITY_TYPE_ENUMS = [
    'CREATED',
    'UPDATED',
    'DELETED',
    'ASSIGNED',
    'UNASSIGNED',
    'STATUS_CHANGED',
    'PIPELINE_CHANGED',
    'STAGE_CHANGED',
    'PRIORITY_CHANGED',
    'COMMENT_ADDED',
    'COMMENT_UPDATED',
    'COMMENT_DELETED',
    'FOLLOWUP_CREATED',
    'FOLLOWUP_UPDATED',
    'FOLLOWUP_COMPLETED',
    'CALL_LOGGED',
    'EMAIL_SENT',
    'WHATSAPP_SENT',
    'TASK_CREATED',
    'TASK_COMPLETED',
    'DEAL_CREATED',
    'DEAL_WON',
    'DEAL_LOST',
    'CUSTOM_FIELD_UPDATED',
];
export const activityTypes = [
    { value: '', label: 'All' },
    ...ACTIVITY_TYPE_ENUMS.map((value) => ({ value, label: formatActivityType(value) })),
];
export const DEFAULT_FILTERS = {
    date: '',
    startTime: '',
    endTime: '',
    staff: 1,
};
//# sourceMappingURL=index.js.map