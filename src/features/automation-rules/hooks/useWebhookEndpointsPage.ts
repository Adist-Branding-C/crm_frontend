import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutomationData } from '../context/AutomationDataContext';
import type { WebhookActionConfig } from '../types';

export function useWebhookEndpointsPage() {
  const navigate = useNavigate();
  const { webhookEndpoints, rules } = useAutomationData();

  const findRuleIdForUrl = useMemo(() => {
    const map = new Map<string, string>();
    rules.forEach((rule) => {
      rule.actions.forEach((action) => {
        if (action.actionType === 'WEBHOOK') {
          const url = (action.actionConfig as WebhookActionConfig).url;
          if (url && !map.has(url)) map.set(url, rule.id);
        }
      });
    });
    return map;
  }, [rules]);

  const handleRowClick = (url: string) => {
    const ruleId = findRuleIdForUrl.get(url);
    if (ruleId) navigate(`/automation-rules/${ruleId}/execution-logs`);
  };

  return { webhookEndpoints, handleRowClick, findRuleIdForUrl };
}
