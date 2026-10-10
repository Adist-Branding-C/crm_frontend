import { describe, expect, it } from 'vitest';
import { mapApiExecutionLogToUI, mapApiRuleToUI } from './automationRuleMapper';
import type { ActionConfig } from '../types';
import type { AutomationRuleApiItem, ExecutionLogApiItem } from '../types/response';

const baseRule: AutomationRuleApiItem = {
  id: 1,
  companyId: 'company-a',
  name: 'Won lead follow-up',
  triggerType: 'VALUE_CHANGE',
  isActive: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  triggerConfig: { fieldName: 'statusId', toValue: 'WON' },
};

const baseLog: ExecutionLogApiItem = {
  id: 10,
  automationRuleId: 1,
  actionId: 2,
  companyId: 'company-a',
  aggregateType: 'lead',
  aggregateId: 'LEAD-1',
  outboxEventId: 5,
  status: 'success',
  retryCount: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('mapApiRuleToUI', () => {
  it('loads a NOTIFICATION action with its config unchanged', () => {
    const rule = mapApiRuleToUI({
      ...baseRule,
      actions: [
        {
          id: 1,
          actionType: 'ADD_TASK',
          actionConfig: { taskType: 'GENERAL', taskName: 'Follow up', priority: 'High', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 },
          executionOrder: 1,
          isActive: true,
        },
        {
          id: 2,
          actionType: 'NOTIFICATION',
          actionConfig: { recipient: 'SPECIFIC_USER', userId: 'staff-9', title: 'Lead {{lead.name}} won', message: 'Congratulate' },
          executionOrder: 2,
          isActive: true,
        },
      ],
    });

    expect(rule.actions).toHaveLength(2);
    expect(rule.actions[1]?.actionType).toBe('NOTIFICATION');
    expect(rule.actions[1]?.actionConfig).toEqual({
      recipient: 'SPECIFIC_USER',
      userId: 'staff-9',
      title: 'Lead {{lead.name}} won',
      message: 'Congratulate',
    });
  });

  it('defaults a legacy ADD_TASK action missing taskType to GENERAL', () => {
    const rule = mapApiRuleToUI({
      ...baseRule,
      actions: [
        {
          id: 1,
          actionType: 'ADD_TASK',
          // A pre-taskType rule persisted by an older build.
          actionConfig: { taskName: 'Follow up', priority: 'High', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 } as unknown as ActionConfig,
          executionOrder: 1,
          isActive: true,
        },
      ],
    });

    expect(rule.actions[0]?.actionConfig).toEqual({
      taskType: 'GENERAL',
      taskName: 'Follow up',
      priority: 'High',
      assigneeType: 'LEAD_OWNER',
      startAfterMinutes: 0,
    });
  });

  it('keeps an ADD_TASK action taskType when one is present', () => {
    const rule = mapApiRuleToUI({
      ...baseRule,
      actions: [
        {
          id: 1,
          actionType: 'ADD_TASK',
          actionConfig: { taskType: 'CALL', taskName: 'Call back', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 5 },
          executionOrder: 1,
          isActive: true,
        },
      ],
    });

    expect((rule.actions[0]?.actionConfig as { taskType?: string }).taskType).toBe('CALL');
  });
});

describe('mapApiExecutionLogToUI', () => {
  it('resolves a NOTIFICATION action log via the action lookup', () => {
    const log = mapApiExecutionLogToUI(baseLog, () => 'NOTIFICATION');
    expect(log.actionType).toBe('NOTIFICATION');
    expect(log.isSweep).toBeUndefined();
    expect(log.aggregateType).toBe('lead');
  });

  it('marks rule sweeps (actionId 0 / aggregateType rule) and leaves lead fields unset', () => {
    const log = mapApiExecutionLogToUI(
      { ...baseLog, actionId: 0, aggregateType: 'rule', aggregateId: '1', status: 'failed', resultMessage: 'boom' },
      () => undefined,
    );
    expect(log.isSweep).toBe(true);
    expect(log.aggregateType).toBe('rule');
    expect(log.leadId).toBeUndefined();
    expect(log.resultMessage).toBe('boom');
  });
});
