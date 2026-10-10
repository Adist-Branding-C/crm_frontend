import type { ActionConfig, ActionType, AddTaskActionConfig, AggregateType, AutomationRule, ExecutionLog, RuleAction, TriggerConfig, WebhookEndpoint, WebhookHistoryEntry } from '../types';
import type {
  AutomationRuleApiItem,
  AutomationRuleActionApiItem,
  ExecutionLogApiItem,
  WebhookHistoryApiItem,
  WebhookEndpointApiItem,
} from '../types/response';

// The API's triggerConfig is the raw TriggerConfig entity — it carries BaseEntity fields
// (id, createdAt, deletedAt, ...) and automationRuleId that the update DTO doesn't accept
// (whitelist validation rejects unknown properties). Pick only the fields the UI/DTO know
// about rather than passing the entity through untouched.
function mapApiTriggerConfigToUI(config: AutomationRuleApiItem['triggerConfig']): TriggerConfig {
  if (!config) return {};
  const {
    fieldName, fromValue, toValue, statusIds, durationMinutes,
    reassignToType, reassignToStaffId, reassignToDepartmentId, minAgeMinutes,
  } = config;
  return {
    ...(fieldName ? { fieldName } : {}),
    ...(fromValue ? { fromValue } : {}),
    ...(toValue ? { toValue } : {}),
    ...(statusIds ? { statusIds } : {}),
    ...(durationMinutes != null ? { durationMinutes } : {}),
    ...(reassignToType ? { reassignToType } : {}),
    ...(reassignToStaffId ? { reassignToStaffId } : {}),
    ...(reassignToDepartmentId ? { reassignToDepartmentId } : {}),
    ...(minAgeMinutes != null ? { minAgeMinutes } : {}),
  };
}

// Older ADD_TASK rules were saved before taskType existed and the backend now rejects them
// at run time ("taskType is required"). Default the missing discriminator on load so the
// form shows GENERAL and simply re-saving the rule repairs it.
function normalizeActionConfig(actionType: ActionType, config: ActionConfig): ActionConfig {
  if (actionType === 'ADD_TASK') {
    const addTask = config as AddTaskActionConfig;
    if (!addTask.taskType) return { ...addTask, taskType: 'GENERAL' };
  }
  return config;
}

export function mapApiActionToUI(action: AutomationRuleActionApiItem): RuleAction {
  return {
    id: String(action.id),
    actionType: action.actionType,
    actionConfig: normalizeActionConfig(action.actionType, action.actionConfig),
    executionOrder: action.executionOrder,
    isActive: action.isActive,
  };
}

export function mapApiRuleToUI(rule: AutomationRuleApiItem): AutomationRule {
  return {
    id: String(rule.id),
    companyId: rule.companyId,
    name: rule.name,
    ...(rule.description ? { description: rule.description } : {}),
    triggerType: rule.triggerType,
    isActive: rule.isActive,
    createdAt: rule.createdAt,
    updatedAt: rule.updatedAt,
    ...(rule.deletedAt ? { deletedAt: rule.deletedAt } : {}),
    triggerConfig: mapApiTriggerConfigToUI(rule.triggerConfig),
    actions: (rule.actions ?? []).slice().sort((a, b) => a.executionOrder - b.executionOrder).map(mapApiActionToUI),
  };
}

type ActionTypeLookup = (actionId: number) => ExecutionLog['actionType'] | undefined;

function toAggregateType(value: string | null | undefined): AggregateType {
  if (value === 'deal' || value === 'task' || value === 'rule') return value;
  return 'lead';
}

export function mapApiExecutionLogToUI(log: ExecutionLogApiItem, actionType: ActionTypeLookup): ExecutionLog {
  const aggregateType = toAggregateType(log.aggregateType);
  // actionId 0 + aggregateType 'rule' is the backend's reserved sentinel for a cron sweep
  // run (no per-action row), so it must not be mistaken for a webhook execution.
  const isSweep = log.actionId === 0 || aggregateType === 'rule';
  return {
    id: String(log.id),
    automationRuleId: String(log.automationRuleId),
    actionId: String(log.actionId),
    actionType: actionType(log.actionId) ?? 'WEBHOOK',
    ...(isSweep ? { isSweep } : {}),
    aggregateType,
    aggregateId: log.aggregateId,
    ...(aggregateType === 'deal'
      ? {
          dealId: log.aggregateId,
          ...(log.dealName ? { dealName: log.dealName } : {}),
        }
      : aggregateType === 'task'
        ? {
            taskId: log.aggregateId,
            ...(log.taskName ? { taskName: log.taskName } : {}),
          }
        : aggregateType === 'rule'
          // Sweep rows carry the rule id as aggregateId; leave the lead fields unset so the
          // row renders as "Rule" instead of a bogus lead.
          ? {}
          : {
              leadId: log.aggregateId,
              leadName: log.leadName || log.aggregateId,
            }),
    status: log.status,
    retryCount: log.retryCount,
    ...(log.resultMessage ? { resultMessage: log.resultMessage } : {}),
    triggeredAt: log.createdAt,
    ...(log.deadAt ? { deadAt: log.deadAt } : {}),
  };
}

export function mapApiWebhookHistoryToUI(entry: WebhookHistoryApiItem): WebhookHistoryEntry {
  const leadId = entry.leadId ?? null;
  const dealId = entry.dealId ?? null;
  const taskId = entry.taskId ?? null;
  const aggregateType: AggregateType | undefined =
    entry.aggregateType === 'deal' || entry.aggregateType === 'task' || entry.aggregateType === 'lead'
      ? entry.aggregateType
      : dealId && !leadId
        ? 'deal'
        : taskId && !leadId && !dealId
          ? 'task'
          : leadId
            ? 'lead'
            : undefined;
  const aggregateId = dealId ?? taskId ?? leadId ?? undefined;
  return {
    id: String(entry.id),
    executionLogId: String(entry.executionLogId),
    ...(entry.statusCode != null ? { statusCode: entry.statusCode } : {}),
    ...(entry.responseBody ? { responseBody: entry.responseBody } : {}),
    status: entry.status,
    resolved: entry.resolved,
    ...(entry.durationMs != null ? { durationMs: entry.durationMs } : {}),
    ...(entry.errorMessage ? { errorMessage: entry.errorMessage } : {}),
    createdAt: entry.createdAt,
    ...(entry.webhookUrl ? { webhookUrl: entry.webhookUrl } : {}),
    ...(leadId ? { leadId } : {}),
    ...(dealId ? { dealId } : {}),
    ...(taskId ? { taskId } : {}),
    ...(entry.leadName ? { leadName: entry.leadName } : {}),
    ...(entry.dealName ? { dealName: entry.dealName } : {}),
    ...(entry.taskName ? { taskName: entry.taskName } : {}),
    ...(aggregateType ? { aggregateType } : {}),
    ...(aggregateId ? { aggregateId } : {}),
  };
}

export function mapApiWebhookEndpointToUI(endpoint: WebhookEndpointApiItem): WebhookEndpoint {
  return {
    id: String(endpoint.id),
    url: endpoint.url,
    ...(endpoint.description ? { description: endpoint.description } : {}),
    isActive: endpoint.isActive,
    ...(endpoint.lastTriggeredAt ? { lastTriggeredAt: endpoint.lastTriggeredAt } : {}),
    ...(endpoint.lastStatus ? { lastStatus: endpoint.lastStatus } : {}),
    consecutiveFailureCount: endpoint.consecutiveFailureCount,
  };
}
