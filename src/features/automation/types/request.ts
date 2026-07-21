import type { AutomationTriggerType, AutomationActionType } from './interface';

export interface GetAutomationsParams {
  pageNumber: number;
  limit: number;
  search?: string | undefined;
}

export interface AutomationRuleActionPayload {
  actionType: AutomationActionType;
  config: Record<string, unknown>;
  sortOrder?: number;
}

export interface CreateAutomationPayload {
  name: string;
  triggerType: AutomationTriggerType;
  isActive: boolean;
  triggerConfig?: Record<string, unknown>;
  actions?: AutomationRuleActionPayload[];
}

export interface UpdateAutomationPayload {
  name?: string;
  triggerType?: AutomationTriggerType;
  isActive?: boolean;
  triggerConfig?: Record<string, unknown>;
  actions?: AutomationRuleActionPayload[];
}
