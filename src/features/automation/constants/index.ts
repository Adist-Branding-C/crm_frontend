import type { AutomationFormData, AutomationTriggerType, AutomationActionType } from '../types/interface';

export const AUTOMATION_API_ENDPOINTS = {
  BASE: '/automation-rules',
  BY_ID: (id: string) => `/automation-rules/${id}`,
  TOGGLE: (id: string) => `/automation-rules/${id}/toggle`,
};

export const AUTOMATION_TRIGGER_TYPE_OPTIONS: { value: AutomationTriggerType; label: string }[] = [
  { value: 'NEW_ENQUIRY', label: 'New Enquiry' },
  { value: 'VALUE_CHANGE', label: 'Value Change' },
  { value: 'REASSIGN', label: 'Reassign' },
  { value: 'NOTIFICATION', label: 'Notification' },
];

export const AUTOMATION_TRIGGER_TYPE_LABEL: Record<AutomationTriggerType, string> = {
  NEW_ENQUIRY: 'New Enquiry',
  VALUE_CHANGE: 'Value Change',
  REASSIGN: 'Reassign',
  NOTIFICATION: 'Notification',
};

export const AUTOMATION_ACTION_TYPE_OPTIONS: { value: AutomationActionType; label: string }[] = [
  { value: 'WEBHOOK', label: 'Trigger Webhook' },
  { value: 'ADD_TASK', label: 'Add Task' },
  { value: 'ASSIGN_LEAD', label: 'Assign Lead' },
  { value: 'ADD_TO_CAMPAIGN', label: 'Add to Campaign' },
];

export const AUTOMATION_ACTION_TYPE_LABEL: Record<AutomationActionType, string> = {
  WEBHOOK: 'Trigger Webhook',
  ADD_TASK: 'Add Task',
  ASSIGN_LEAD: 'Assign Lead',
  ADD_TO_CAMPAIGN: 'Add to Campaign',
};

// Trigger -> allowed action types, mirrors the backend's TRIGGER_ACTION_MATRIX
// (src/automation/constants/automation.constants.ts) so the Add Action
// dropdown only ever offers what the server would actually accept.
// REASSIGN/NOTIFICATION have a built-in action (not user-selectable), so the
// whole Actions section is hidden for those trigger types - see
// AutomationBuilderPage.
export const TRIGGER_ACTION_MATRIX: Record<AutomationTriggerType, AutomationActionType[]> = {
  NEW_ENQUIRY: ['WEBHOOK', 'ADD_TASK', 'ASSIGN_LEAD', 'ADD_TO_CAMPAIGN'],
  VALUE_CHANGE: ['WEBHOOK', 'ADD_TASK', 'ASSIGN_LEAD'],
  REASSIGN: [],
  NOTIFICATION: [],
};

// Fields a VALUE_CHANGE trigger may watch - mirrors the backend's
// VALUE_CHANGE_MONITORABLE_FIELDS whitelist.
export const VALUE_CHANGE_FIELD_OPTIONS: { value: string; label: string }[] = [
  { value: 'statusId', label: 'Status' },
  { value: 'purposeId', label: 'Purpose' },
  { value: 'typeId', label: 'Type' },
  { value: 'sourceId', label: 'Source' },
  { value: 'agentId', label: 'Lead Owner' },
  { value: 'nextFollowUpDate', label: 'Next Follow-up Date' },
];

export const ASSIGN_TO_TYPE_OPTIONS = [
  { value: 'STAFF', label: 'Specific Staff' },
  { value: 'DEPARTMENT', label: 'Department' },
];

export const TASK_ASSIGNEE_TYPE_OPTIONS = [
  { value: 'LEAD_OWNER', label: 'Lead Owner' },
  { value: 'STAFF', label: 'Specific Staff' },
];

export const MINUTES_HINT = '60 = 1 hour, 1440 = 1 day';

// Blank Formik initial state for the builder page's "add" mode.
export const ADD_AUTOMATION_INITIAL_VALUES: AutomationFormData = {
  name: '',
  triggerType: '',
  isActive: true,
  triggerConfig: {},
  actions: [],
};
