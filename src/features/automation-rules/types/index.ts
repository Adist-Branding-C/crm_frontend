export type TriggerType =
  | 'NEW_ENQUIRY'
  | 'VALUE_CHANGE'
  | 'REASSIGN'
  | 'NOTIFICATION'
  | 'DEAL_CREATED'
  | 'DEAL_UPDATED'
  | 'DEAL_STAGE_CHANGED'
  | 'TASK_CREATED'
  | 'TASK_UPDATED'
  | 'TASK_STAGE_CHANGED';

export type AggregateType = 'lead' | 'deal' | 'task' | 'rule';

export type ActionType = 'WEBHOOK' | 'ADD_TASK' | 'ASSIGN_LEAD' | 'ADD_TO_CAMPAIGN' | 'NOTIFICATION';

export type AssignToType = 'STAFF' | 'DEPARTMENT';

export type NotificationRecipient = 'LEAD_OWNER' | 'SPECIFIC_USER';

// Matches crm_backend's TaskPriority enum exactly (Title-case values, not upper-case) —
// a mismatch here fails silently until the backend rejects the value at execution time
// with "invalid input value for enum tasks_priority_enum".
export type TaskPriority = 'Low' | 'Medium' | 'High';

// Matches crm_backend's UnifiedTaskType enum — the discriminator a task create requires
// ("taskType is required (GENERAL | CALL | CAMPAIGN | DEAL)").
export type TaskType = 'GENERAL' | 'CALL' | 'CAMPAIGN' | 'DEAL';

export type TaskAssigneeType = 'LEAD_OWNER' | 'STAFF';

export type ExecutionStatus = 'queued' | 'success' | 'failed' | 'dead';

export type WebhookAttemptStatus = 'success' | 'failed';

export interface TriggerConfig {
  fieldName?: string;
  fromValue?: string;
  toValue?: string;
  statusIds?: string[];
  durationMinutes?: number;
  reassignToType?: AssignToType;
  reassignToStaffId?: string;
  reassignToDepartmentId?: string;
  minAgeMinutes?: number;
}

export interface ActionFilters {
  sourceIds?: string[];
  statusIds?: string[];
  purposeIds?: string[];
}

export interface WebhookActionConfig extends ActionFilters {
  url: string;
}

export interface AddTaskActionConfig {
  taskType: TaskType;
  taskName: string;
  description?: string;
  priority: TaskPriority;
  assigneeType: TaskAssigneeType;
  assigneeStaffId?: string;
  startAfterMinutes: number;
}

export interface AssignLeadActionConfig extends ActionFilters {
  assignToType: AssignToType;
  staffId?: string;
  departmentId?: string;
}

export interface AddToCampaignActionConfig extends ActionFilters {
  campaignId: string;
}

// In-app notification action (lead triggers only). title/message may contain the
// placeholders {{lead.name}}, {{lead.status}} and {{lead.phone}}, rendered at execution time.
export interface NotificationActionConfig {
  recipient: NotificationRecipient;
  userId?: string;
  title: string;
  message: string;
}

export type ActionConfig =
  | WebhookActionConfig
  | AddTaskActionConfig
  | AssignLeadActionConfig
  | AddToCampaignActionConfig
  | NotificationActionConfig;

export interface RuleAction {
  id: string;
  actionType: ActionType;
  actionConfig: ActionConfig;
  executionOrder: number;
  isActive: boolean;
}

export interface AutomationRule {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  triggerType: TriggerType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  deletedAt?: string;
  triggerConfig: TriggerConfig;
  actions: RuleAction[];
}

export interface WebhookHistoryEntry {
  id: string;
  executionLogId: string;
  statusCode?: number;
  responseBody?: string;
  status: WebhookAttemptStatus;
  resolved: boolean;
  durationMs?: number;
  errorMessage?: string;
  createdAt: string;
  webhookUrl?: string;
  // A webhook attempt belongs to a lead, deal or task; older responses may omit the
  // deal/task fields entirely, so every aggregate field is optional and nullable.
  leadId?: string | null;
  dealId?: string | null;
  taskId?: string | null;
  leadName?: string;
  dealName?: string;
  taskName?: string;
  aggregateType?: AggregateType;
  aggregateId?: string;
}

export interface ExecutionLog {
  id: string;
  automationRuleId: string;
  actionId: string;
  actionType: ActionType;
  // Rule-level cron sweep rows (REASSIGN/NOTIFICATION) have no action: actionId 0 and
  // aggregateType 'rule'. Flagged so the UI shows a sweep label instead of a fake action.
  isSweep?: boolean;
  leadId?: string | null;
  leadName?: string;
  dealId?: string | null;
  dealName?: string;
  taskId?: string | null;
  taskName?: string;
  aggregateType?: AggregateType;
  aggregateId?: string;
  status: ExecutionStatus;
  retryCount: number;
  resultMessage?: string;
  triggeredAt: string;
  deadAt?: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  description?: string;
  isActive: boolean;
  lastTriggeredAt?: string;
  lastStatus?: WebhookAttemptStatus;
  consecutiveFailureCount: number;
}

export interface SelectOption {
  value: string;
  label: string;
}
