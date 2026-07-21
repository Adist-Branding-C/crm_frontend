export type AutomationTriggerType = 'NEW_ENQUIRY' | 'VALUE_CHANGE' | 'REASSIGN' | 'NOTIFICATION';
export type AutomationActionType = 'WEBHOOK' | 'ADD_TASK' | 'ASSIGN_LEAD' | 'ADD_TO_CAMPAIGN';

export interface AutomationRuleActionItem {
  id?: string;
  actionType: AutomationActionType;
  config: Record<string, unknown>;
  sortOrder?: number;
}

export interface AutomationRule {
  id: string;
  slNo: number;
  name: string;
  triggerType: AutomationTriggerType;
  isActive: boolean;
  createdAt: string;
  triggerConfig?: Record<string, unknown>;
  actions?: AutomationRuleActionItem[];
}

export type AutomationActionFormEntry = {
  actionType: AutomationActionType | '';
  config: Record<string, unknown>;
};

export type AutomationFormData = {
  name: string;
  triggerType: AutomationTriggerType | '';
  isActive: boolean;
  triggerConfig: Record<string, unknown>;
  actions: AutomationActionFormEntry[];
};
