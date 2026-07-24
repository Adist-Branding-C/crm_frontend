import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AutomationRule, WebhookEndpoint } from '../types';
import { automationRulesApi, type AutomationRulePayload } from '../services/automationRulesApi';
import { mapApiRuleToUI, mapApiWebhookEndpointToUI } from '../mappers/automationRuleMapper';
import { useAutomationLookupOptions, type AutomationLookupOptions } from '../hooks/useAutomationLookupOptions';

let nextActionSeq = 1;

/** Client-only key for React lists before a new action has a real (backend-assigned) id. */
export function generateActionId() {
  return `new-action-${nextActionSeq++}`;
}

type RuleDraft = Omit<AutomationRule, 'id' | 'companyId' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

function toPayload(draft: RuleDraft): AutomationRulePayload {
  const isActionlessTrigger = draft.triggerType === 'REASSIGN' || draft.triggerType === 'NOTIFICATION';
  return {
    name: draft.name,
    ...(draft.description ? { description: draft.description } : {}),
    isActive: draft.isActive,
    triggerType: draft.triggerType,
    triggerConfig: draft.triggerConfig,
    actions: isActionlessTrigger ? [] : draft.actions.map((action) => ({
      actionType: action.actionType,
      actionConfig: action.actionConfig,
      executionOrder: action.executionOrder,
      isActive: action.isActive,
    })),
  };
}

interface AutomationDataContextValue extends AutomationLookupOptions {
  rules: AutomationRule[];
  isLoadingRules: boolean;
  refetchRules: () => Promise<void>;
  getRuleById: (id: string) => AutomationRule | undefined;
  fetchRuleById: (id: string) => Promise<AutomationRule | undefined>;
  createRule: (draft: RuleDraft) => Promise<void>;
  updateRule: (id: string, draft: RuleDraft) => Promise<void>;
  toggleRuleActive: (id: string) => Promise<void>;
  softDeleteRule: (id: string) => Promise<void>;
  webhookEndpoints: WebhookEndpoint[];
}

const AutomationDataContext = createContext<AutomationDataContextValue | undefined>(undefined);

export function AutomationDataProvider({ children }: { children: ReactNode }) {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [isLoadingRules, setIsLoadingRules] = useState(true);
  const [webhookEndpoints, setWebhookEndpoints] = useState<WebhookEndpoint[]>([]);
  const lookupOptions = useAutomationLookupOptions();

  const refetchRules = useCallback(async () => {
    setIsLoadingRules(true);
    try {
      const response = await automationRulesApi.getRules({ pageNumber: 1, limit: 100 });
      const items = response.data?.items ?? [];
      setRules(items.map(mapApiRuleToUI));
    } finally {
      setIsLoadingRules(false);
    }
  }, []);

  const refetchWebhookEndpoints = useCallback(async () => {
    const response = await automationRulesApi.getWebhookEndpoints();
    setWebhookEndpoints((response.data ?? []).map(mapApiWebhookEndpointToUI));
  }, []);

  useEffect(() => {
    refetchRules();
    refetchWebhookEndpoints();
  }, [refetchRules, refetchWebhookEndpoints]);

  const getRuleById = useCallback((id: string) => rules.find((rule) => rule.id === id), [rules]);

  const fetchRuleById = useCallback(async (id: string) => {
    const response = await automationRulesApi.getRule(Number(id));
    return response.data ? mapApiRuleToUI(response.data) : undefined;
  }, []);

  const createRule = useCallback(async (draft: RuleDraft) => {
    await automationRulesApi.createRule(toPayload(draft));
    await refetchRules();
  }, [refetchRules]);

  const updateRule = useCallback(async (id: string, draft: RuleDraft) => {
    await automationRulesApi.updateRule(Number(id), toPayload(draft));
    await refetchRules();
  }, [refetchRules]);

  const toggleRuleActive = useCallback(async (id: string) => {
    await automationRulesApi.toggleRule(Number(id));
    await refetchRules();
  }, [refetchRules]);

  const softDeleteRule = useCallback(async (id: string) => {
    await automationRulesApi.deleteRule(Number(id));
    await refetchRules();
  }, [refetchRules]);

  const value = useMemo<AutomationDataContextValue>(() => ({
    rules,
    isLoadingRules,
    refetchRules,
    getRuleById,
    fetchRuleById,
    createRule,
    updateRule,
    toggleRuleActive,
    softDeleteRule,
    webhookEndpoints,
    ...lookupOptions,
  }), [
    rules, isLoadingRules, refetchRules, getRuleById, fetchRuleById,
    createRule, updateRule, toggleRuleActive, softDeleteRule, webhookEndpoints, lookupOptions,
  ]);

  return <AutomationDataContext.Provider value={value}>{children}</AutomationDataContext.Provider>;
}

export function useAutomationData() {
  const context = useContext(AutomationDataContext);
  if (!context) {
    throw new Error('useAutomationData must be used within an AutomationDataProvider');
  }
  return context;
}
