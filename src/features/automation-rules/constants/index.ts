import type {
  ActionType,
  AddTaskActionConfig,
  AddToCampaignActionConfig,
  AssignLeadActionConfig,
  ExecutionStatus,
  TriggerType,
  WebhookActionConfig,
} from '../types';

export const MAX_CHAIN_DEPTH = 3;
export const WEBHOOK_MAX_ATTEMPTS = 5;

export const TRIGGER_TYPE_META: Record<TriggerType, { label: string; description: string; badgeClass: string }> = {
  NEW_ENQUIRY: {
    label: 'New Enquiry',
    description: 'Fires when a new lead is created.',
    badgeClass: 'badge-trigger-new-enquiry',
  },
  VALUE_CHANGE: {
    label: 'Value Change',
    description: 'Fires when a specific lead field changes.',
    badgeClass: 'badge-trigger-value-change',
  },
  REASSIGN: {
    label: 'Reassign',
    description: 'Fires when a lead sits in a status too long; reassigns it.',
    badgeClass: 'badge-trigger-reassign',
  },
  NOTIFICATION: {
    label: 'Notification',
    description: 'Fires when leads have been idle past a set age.',
    badgeClass: 'badge-trigger-notification',
  },
};

export const TRIGGER_TYPE_FILTER_OPTIONS = [
  { value: '', label: 'All Triggers' },
  { value: 'NEW_ENQUIRY', label: 'New Enquiry' },
  { value: 'VALUE_CHANGE', label: 'Value Change' },
  { value: 'REASSIGN', label: 'Reassign' },
  { value: 'NOTIFICATION', label: 'Notification' },
];

export const ACTION_TYPE_META: Record<ActionType, { label: string; description: string }> = {
  WEBHOOK: { label: 'Webhook', description: 'Call an external URL with lead/event data.' },
  ADD_TASK: { label: 'Add Task', description: 'Create a task for a staff member.' },
  ASSIGN_LEAD: { label: 'Assign Lead', description: 'Assign the lead to staff or a department.' },
  ADD_TO_CAMPAIGN: { label: 'Add to Campaign', description: 'Add the lead to a chosen campaign.' },
};

export const ACTION_TYPES: ActionType[] = ['WEBHOOK', 'ADD_TASK', 'ASSIGN_LEAD', 'ADD_TO_CAMPAIGN'];

export const EXECUTION_STATUS_META: Record<ExecutionStatus, { label: string; badgeClass: string }> = {
  queued: { label: 'Queued', badgeClass: 'badge-exec-queued' },
  success: { label: 'Success', badgeClass: 'badge-exec-success' },
  failed: { label: 'Failed', badgeClass: 'badge-exec-failed' },
  dead: { label: 'Dead', badgeClass: 'badge-exec-dead' },
};

export const EXECUTION_STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'queued', label: 'Queued' },
  { value: 'success', label: 'Success' },
  { value: 'failed', label: 'Failed' },
  { value: 'dead', label: 'Dead' },
];

export const DEFAULT_WEBHOOK_CONFIG: WebhookActionConfig = { url: '' };

export const DEFAULT_ADD_TASK_CONFIG: AddTaskActionConfig = {
  taskName: '',
  description: '',
  priority: 'Medium',
  assigneeType: 'LEAD_OWNER',
  startAfterMinutes: 0,
};

export const DEFAULT_ASSIGN_LEAD_CONFIG: AssignLeadActionConfig = {
  assignToType: 'STAFF',
};

export const DEFAULT_ADD_TO_CAMPAIGN_CONFIG: AddToCampaignActionConfig = {
  campaignId: '',
};

export const DEFAULT_ACTION_CONFIG: Record<ActionType, AddTaskActionConfig | WebhookActionConfig | AssignLeadActionConfig | AddToCampaignActionConfig> = {
  WEBHOOK: DEFAULT_WEBHOOK_CONFIG,
  ADD_TASK: DEFAULT_ADD_TASK_CONFIG,
  ASSIGN_LEAD: DEFAULT_ASSIGN_LEAD_CONFIG,
  ADD_TO_CAMPAIGN: DEFAULT_ADD_TO_CAMPAIGN_CONFIG,
};
