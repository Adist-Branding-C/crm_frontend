import { describe, expect, it } from 'vitest';
import { aggregateDisplayName, resolveAggregateKind } from './aggregateDisplay';

describe('aggregate display', () => {
  it('keeps existing lead behavior (id/name)', () => {
    expect(aggregateDisplayName({ aggregateType: 'lead', aggregateId: '42', leadId: '42', leadName: '42' })).toBe('42');
    expect(aggregateDisplayName({ aggregateType: 'lead', leadName: 'Jane Lead' })).toBe('Jane Lead');
  });

  it('shows the deal name for deal aggregates', () => {
    expect(aggregateDisplayName({ aggregateType: 'deal', aggregateId: '7', dealId: '7', dealName: 'Big Deal' })).toBe('Big Deal');
  });

  it('labels a deal by id when no deal name is available', () => {
    expect(aggregateDisplayName({ aggregateType: 'deal', dealId: '7' })).toBe('Deal 7');
  });

  it('shows the task name for task aggregates', () => {
    expect(aggregateDisplayName({ aggregateType: 'task', aggregateId: '9', taskId: '9', taskName: 'Follow up' })).toBe('Follow up');
  });

  it('labels a task by id when no task name is available', () => {
    expect(aggregateDisplayName({ aggregateType: 'task', taskId: '9' })).toBe('Task 9');
  });

  it('infers a deal or task aggregate from the id when aggregateType is missing', () => {
    expect(resolveAggregateKind({ dealId: '7', leadId: null })).toBe('deal');
    expect(aggregateDisplayName({ dealId: '7' })).toBe('Deal 7');
    expect(resolveAggregateKind({ taskId: '9' })).toBe('task');
    expect(aggregateDisplayName({ taskId: '9' })).toBe('Task 9');
  });

  it('renders a rule sweep row as Rule', () => {
    expect(resolveAggregateKind({ aggregateType: 'rule', aggregateId: '1' })).toBe('rule');
    expect(aggregateDisplayName({ aggregateType: 'rule', aggregateId: '1' })).toBe('Rule');
  });

  it('never renders undefined', () => {
    expect(aggregateDisplayName({ aggregateType: 'deal' })).toBe('Deal');
    expect(aggregateDisplayName({ aggregateType: 'task' })).toBe('Task');
    expect(aggregateDisplayName({})).toBe('-');
  });
});
