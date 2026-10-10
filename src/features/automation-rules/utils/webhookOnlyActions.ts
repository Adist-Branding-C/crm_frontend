import type { RuleAction, WebhookActionConfig } from '../types';

// Deal and Task triggers are webhook-only and reject lead-only filters
// (source/status/purpose). Strip everything the backend would reject so such a rule can
// never submit an invalid action payload, regardless of how the form state was reached.
export function sanitizeWebhookOnlyActions(actions: RuleAction[]): RuleAction[] {
  return actions
    .filter((action) => action.actionType === 'WEBHOOK')
    .map((action, index) => {
      const { url } = action.actionConfig as WebhookActionConfig;
      return {
        ...action,
        actionConfig: { url },
        executionOrder: index + 1,
      };
    });
}
