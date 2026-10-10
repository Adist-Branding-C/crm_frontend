import type {
  ActionType,
  AddTaskActionConfig,
  AddToCampaignActionConfig,
  AssignLeadActionConfig,
  ExecutionStatus,
  NotificationActionConfig,
  TaskType,
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
  DEAL_CREATED: {
    label: 'Deal Created',
    description: 'Fires when a new deal is created.',
    badgeClass: 'badge-trigger-deal-created',
  },
  DEAL_UPDATED: {
    label: 'Deal Updated',
    description: 'Fires when a deal is updated.',
    badgeClass: 'badge-trigger-deal-updated',
  },
  DEAL_STAGE_CHANGED: {
    label: 'Deal Stage Changed',
    description: 'Fires when a deal moves to a different stage.',
    badgeClass: 'badge-trigger-deal-stage',
  },
  TASK_CREATED: {
    label: 'Task Created',
    description: 'Fires when a new task is created.',
    badgeClass: 'badge-trigger-task-created',
  },
  TASK_UPDATED: {
    label: 'Task Updated',
    description: 'Fires when a task is updated.',
    badgeClass: 'badge-trigger-task-updated',
  },
  TASK_STAGE_CHANGED: {
    label: 'Task Stage Changed',
    description: 'Fires when a task moves to a different stage.',
    badgeClass: 'badge-trigger-task-stage',
  },
};

export const LEAD_TRIGGER_TYPES: TriggerType[] = ['NEW_ENQUIRY', 'VALUE_CHANGE', 'REASSIGN', 'NOTIFICATION'];
export const DEAL_TRIGGER_TYPES: TriggerType[] = ['DEAL_CREATED', 'DEAL_UPDATED', 'DEAL_STAGE_CHANGED'];
export const TASK_TRIGGER_TYPES: TriggerType[] = ['TASK_CREATED', 'TASK_UPDATED', 'TASK_STAGE_CHANGED'];

// Deal and Task rules only support the webhook action and reject lead-only filters/fields.
export function isDealTrigger(triggerType: TriggerType | '' | null | undefined): boolean {
  return !!triggerType && (DEAL_TRIGGER_TYPES as string[]).includes(triggerType);
}

export function isTaskTrigger(triggerType: TriggerType | '' | null | undefined): boolean {
  return !!triggerType && (TASK_TRIGGER_TYPES as string[]).includes(triggerType);
}

export function isWebhookOnlyTrigger(triggerType: TriggerType | '' | null | undefined): boolean {
  return isDealTrigger(triggerType) || isTaskTrigger(triggerType);
}

// Resolve a trigger's display metadata, gracefully degrading to a humanized label for
// values the UI doesn't know yet so a badge never renders a raw/empty/undefined value.
export function getTriggerMeta(triggerType: string): { label: string; description: string; badgeClass: string } {
  const known = (TRIGGER_TYPE_META as Record<string, { label: string; description: string; badgeClass: string } | undefined>)[triggerType];
  if (known) return known;
  const label = triggerType
    ? triggerType.replace(/[_-]+/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    : 'Unknown Trigger';
  return { label, description: '', badgeClass: 'badge-trigger-fallback' };
}

export const TRIGGER_TYPE_FILTER_OPTIONS = [
  { value: '', label: 'All Triggers' },
  { value: 'NEW_ENQUIRY', label: 'New Enquiry' },
  { value: 'VALUE_CHANGE', label: 'Value Change' },
  { value: 'REASSIGN', label: 'Reassign' },
  { value: 'NOTIFICATION', label: 'Notification' },
  { value: 'DEAL_CREATED', label: 'Deal Created' },
  { value: 'DEAL_UPDATED', label: 'Deal Updated' },
  { value: 'DEAL_STAGE_CHANGED', label: 'Deal Stage Changed' },
  { value: 'TASK_CREATED', label: 'Task Created' },
  { value: 'TASK_UPDATED', label: 'Task Updated' },
  { value: 'TASK_STAGE_CHANGED', label: 'Task Stage Changed' },
];

export const ACTION_TYPE_META: Record<ActionType, { label: string; description: string }> = {
  WEBHOOK: { label: 'Webhook', description: 'Call an external URL with lead/event data.' },
  ADD_TASK: { label: 'Add Task', description: 'Create a task for a staff member.' },
  ASSIGN_LEAD: { label: 'Assign Lead', description: 'Assign the lead to staff or a department.' },
  ADD_TO_CAMPAIGN: { label: 'Add to Campaign', description: 'Add the lead to a chosen campaign.' },
  NOTIFICATION: { label: 'Send Notification', description: 'Send an in-app notification to a staff member.' },
};

export const ACTION_TYPES: ActionType[] = ['WEBHOOK', 'ADD_TASK', 'ASSIGN_LEAD', 'ADD_TO_CAMPAIGN', 'NOTIFICATION'];

// Notification actions are lead-only, and only NEW_ENQUIRY/VALUE_CHANGE resolve a lead
// owner; Deal/Task/Reassign/Notification triggers must never offer or carry this action.
export function isNotificationAllowed(triggerType: TriggerType | '' | null | undefined): boolean {
  return triggerType === 'NEW_ENQUIRY' || triggerType === 'VALUE_CHANGE';
}

// Placeholders the backend renders at execution time; unknown tokens are left as-is.
export const NOTIFICATION_PLACEHOLDERS = ['{{lead.name}}', '{{lead.status}}', '{{lead.phone}}'];

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

export const WEBHOOK_ATTEMPT_STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'success', label: 'Success' },
  { value: 'failed', label: 'Failed' },
];

export const DEFAULT_WEBHOOK_CONFIG: WebhookActionConfig = { url: '' };

// Task discriminator options offered by the Add Task form; values match the backend's
// UnifiedTaskType enum and GENERAL is the default the API expects when none is chosen.
export const TASK_TYPE_OPTIONS: { value: TaskType; label: string }[] = [
  { value: 'GENERAL', label: 'General' },
  { value: 'CALL', label: 'Call' },
  { value: 'CAMPAIGN', label: 'Campaign' },
  { value: 'DEAL', label: 'Deal' },
];

export const DEFAULT_ADD_TASK_CONFIG: AddTaskActionConfig = {
  taskType: 'GENERAL',
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

export const DEFAULT_NOTIFICATION_CONFIG: NotificationActionConfig = {
  recipient: 'LEAD_OWNER',
  title: '',
  message: '',
};

export const DEFAULT_ACTION_CONFIG: Record<ActionType, AddTaskActionConfig | WebhookActionConfig | AssignLeadActionConfig | AddToCampaignActionConfig | NotificationActionConfig> = {
  WEBHOOK: DEFAULT_WEBHOOK_CONFIG,
  ADD_TASK: DEFAULT_ADD_TASK_CONFIG,
  ASSIGN_LEAD: DEFAULT_ASSIGN_LEAD_CONFIG,
  ADD_TO_CAMPAIGN: DEFAULT_ADD_TO_CAMPAIGN_CONFIG,
  NOTIFICATION: DEFAULT_NOTIFICATION_CONFIG,
};
