export type TriggerType = 'NEW_ENQUIRY' | 'VALUE_CHANGE' | 'REASSIGN' | 'NOTIFICATION';

export type ActionType = 'WEBHOOK' | 'ADD_TASK' | 'ASSIGN_LEAD' | 'ADD_TO_CAMPAIGN';

export type AssignToType = 'STAFF' | 'DEPARTMENT';

// Matches crm_backend's TaskPriority enum exactly (Title-case values, not upper-case) —
// a mismatch here fails silently until the backend rejects the value at execution time
// with "invalid input value for enum tasks_priority_enum".
export type TaskPriority = 'Low' | 'Medium' | 'High';

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

export type ActionConfig =
  | WebhookActionConfig
  | AddTaskActionConfig
  | AssignLeadActionConfig
  | AddToCampaignActionConfig;

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
  leadId?: string;
}

export interface ExecutionLog {
  id: string;
  automationRuleId: string;
  actionId: string;
  actionType: ActionType;
  leadId: string;
  leadName: string;
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
