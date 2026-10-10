import { describe, expect, it } from 'vitest';
import { sanitizeWebhookOnlyActions } from './webhookOnlyActions';
import type { RuleAction } from '../types';

describe('sanitizeWebhookOnlyActions', () => {
  it('keeps only webhook actions and strips lead-only filters', () => {
    const actions: RuleAction[] = [
      {
        id: 'a',
        actionType: 'ADD_TASK',
        actionConfig: { taskType: 'GENERAL', taskName: 'Call', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 },
        executionOrder: 1,
        isActive: true,
      },
      {
        id: 'b',
        actionType: 'WEBHOOK',
        actionConfig: { url: 'https://example.com/hook', sourceIds: ['s1'], purposeIds: ['p1'] },
        executionOrder: 2,
        isActive: true,
      },
    ];

    const result = sanitizeWebhookOnlyActions(actions);

    expect(result).toHaveLength(1);
    expect(result[0]?.actionConfig).toEqual({ url: 'https://example.com/hook' });
    expect(result[0]?.executionOrder).toBe(1);
  });
});
