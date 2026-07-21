import type {
  ActionConfig,
  ActionType,
  ExecutionStatus,
  TriggerConfig,
  TriggerType,
  WebhookAttemptStatus,
} from './index';

// Real backend shapes (crm_backend/src/automation) — snake_case pagination envelope,
// numeric ids (BaseEntity.id is typed string in the backend's TS but the DB column and
// the JSON it serializes to are real integers), and a flat triggerConfig (no nested
// automationRuleId/id noise the UI doesn't need).
export interface PaginationApiMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedApiResponse<T> {
  items: T[];
  pagination: PaginationApiMeta;
}

export interface AutomationRuleActionApiItem {
  id: number;
  actionType: ActionType;
  actionConfig: ActionConfig;
  executionOrder: number;
  isActive: boolean;
}

export interface AutomationRuleApiItem {
  id: number;
  companyId: string;
  name: string;
  description?: string | null;
  triggerType: TriggerType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  triggerConfig?: TriggerConfig | null;
  actions?: AutomationRuleActionApiItem[];
}

export interface ExecutionLogApiItem {
  id: number;
  automationRuleId: number;
  actionId: number;
  companyId: string;
  aggregateType: string;
  aggregateId: string;
  outboxEventId: number;
  status: ExecutionStatus;
  retryCount: number;
  resultMessage?: string | null;
  deadAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookHistoryApiItem {
  id: number;
  webhookEndpointId: number;
  executionLogId: number;
  leadId: string;
  statusCode?: number | null;
  responseBody?: string | null;
  status: WebhookAttemptStatus;
  resolved: boolean;
  durationMs?: number | null;
  errorMessage?: string | null;
  createdAt: string;
}

export interface WebhookEndpointApiItem {
  id: number;
  companyId: string;
  url: string;
  description?: string | null;
  isActive: boolean;
  lastTriggeredAt?: string | null;
  lastStatus?: WebhookAttemptStatus | null;
  consecutiveFailureCount: number;
}
