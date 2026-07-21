import type { AutomationRule, ExecutionLog, RuleAction, TriggerConfig, WebhookEndpoint, WebhookHistoryEntry } from '../types';
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

export function mapApiActionToUI(action: AutomationRuleActionApiItem): RuleAction {
  return {
    id: String(action.id),
    actionType: action.actionType,
    actionConfig: action.actionConfig,
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

export function mapApiExecutionLogToUI(log: ExecutionLogApiItem, actionType: ActionTypeLookup): ExecutionLog {
  return {
    id: String(log.id),
    automationRuleId: String(log.automationRuleId),
    actionId: String(log.actionId),
    actionType: actionType(log.actionId) ?? 'WEBHOOK',
    leadId: log.aggregateId,
    leadName: log.aggregateId,
    status: log.status,
    retryCount: log.retryCount,
    ...(log.resultMessage ? { resultMessage: log.resultMessage } : {}),
    triggeredAt: log.createdAt,
    ...(log.deadAt ? { deadAt: log.deadAt } : {}),
  };
}

export function mapApiWebhookHistoryToUI(entry: WebhookHistoryApiItem): WebhookHistoryEntry {
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
