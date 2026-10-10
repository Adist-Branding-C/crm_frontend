import { describe, expect, it } from 'vitest';
import { TRIGGER_TYPE_FILTER_OPTIONS, getTriggerMeta, isDealTrigger, isTaskTrigger, isWebhookOnlyTrigger, isNotificationAllowed } from './index';

describe('deal and task trigger metadata', () => {
  it('maps the new deal trigger values to friendly labels', () => {
    expect(getTriggerMeta('DEAL_CREATED').label).toBe('Deal Created');
    expect(getTriggerMeta('DEAL_UPDATED').label).toBe('Deal Updated');
    expect(getTriggerMeta('DEAL_STAGE_CHANGED').label).toBe('Deal Stage Changed');
  });

  it('humanizes unknown trigger values instead of rendering them raw', () => {
    expect(getTriggerMeta('SOME_FUTURE_TRIGGER').label).toBe('Some Future Trigger');
    expect(getTriggerMeta('').label).toBe('Unknown Trigger');
  });

  it('includes deal triggers in the filter options and recognizes them', () => {
    const values = TRIGGER_TYPE_FILTER_OPTIONS.map((option) => option.value);
    expect(values).toContain('DEAL_CREATED');
    expect(values).toContain('DEAL_UPDATED');
    expect(values).toContain('DEAL_STAGE_CHANGED');
    expect(isDealTrigger('DEAL_CREATED')).toBe(true);
    expect(isDealTrigger('NEW_ENQUIRY')).toBe(false);
  });

  it('maps the new task trigger values to friendly labels', () => {
    expect(getTriggerMeta('TASK_CREATED').label).toBe('Task Created');
    expect(getTriggerMeta('TASK_UPDATED').label).toBe('Task Updated');
    expect(getTriggerMeta('TASK_STAGE_CHANGED').label).toBe('Task Stage Changed');
  });

  it('includes task triggers in the filter options and treats deal/task as webhook-only', () => {
    const values = TRIGGER_TYPE_FILTER_OPTIONS.map((option) => option.value);
    expect(values).toContain('TASK_CREATED');
    expect(values).toContain('TASK_UPDATED');
    expect(values).toContain('TASK_STAGE_CHANGED');
    expect(isTaskTrigger('TASK_CREATED')).toBe(true);
    expect(isTaskTrigger('DEAL_CREATED')).toBe(false);
    expect(isWebhookOnlyTrigger('TASK_UPDATED')).toBe(true);
    expect(isWebhookOnlyTrigger('DEAL_UPDATED')).toBe(true);
    expect(isWebhookOnlyTrigger('NEW_ENQUIRY')).toBe(false);
  });

  it('allows notification actions only on lead action triggers', () => {
    expect(isNotificationAllowed('NEW_ENQUIRY')).toBe(true);
    expect(isNotificationAllowed('VALUE_CHANGE')).toBe(true);
    expect(isNotificationAllowed('REASSIGN')).toBe(false);
    expect(isNotificationAllowed('NOTIFICATION')).toBe(false);
    expect(isNotificationAllowed('DEAL_CREATED')).toBe(false);
    expect(isNotificationAllowed('TASK_CREATED')).toBe(false);
  });
});
