import { describe, expect, it } from 'vitest';
import { ruleBuilderValidationSchema } from './index';

const baseValues = {
  name: 'Deal rule',
  description: '',
  isActive: true,
  triggerConfig: {},
  actions: [],
} as const;

describe('rule builder validation — deal triggers', () => {
  it('accepts the three deal trigger values', async () => {
    for (const triggerType of ['DEAL_CREATED', 'DEAL_UPDATED', 'DEAL_STAGE_CHANGED'] as const) {
      await expect(ruleBuilderValidationSchema.validate({ ...baseValues, triggerType })).resolves.toBeTruthy();
    }
  });

  it('rejects non-webhook actions on a deal trigger', async () => {
    await expect(
      ruleBuilderValidationSchema.validate({
        ...baseValues,
        triggerType: 'DEAL_CREATED',
        actions: [
          {
            actionType: 'ADD_TASK',
            actionConfig: { taskType: 'GENERAL', taskName: 'Call', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 },
          },
        ],
      }),
    ).rejects.toThrow('Deal rules support webhook actions only');
  });

  it('still allows non-webhook actions on lead triggers', async () => {
    await expect(
      ruleBuilderValidationSchema.validate({
        ...baseValues,
        triggerType: 'NEW_ENQUIRY',
        actions: [
          {
            actionType: 'ADD_TASK',
            actionConfig: { taskType: 'GENERAL', taskName: 'Call', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 },
          },
        ],
      }),
    ).resolves.toBeTruthy();
  });

  it('accepts the three task trigger values', async () => {
    for (const triggerType of ['TASK_CREATED', 'TASK_UPDATED', 'TASK_STAGE_CHANGED'] as const) {
      await expect(ruleBuilderValidationSchema.validate({ ...baseValues, triggerType })).resolves.toBeTruthy();
    }
  });

  it('rejects non-webhook actions on a task trigger', async () => {
    await expect(
      ruleBuilderValidationSchema.validate({
        ...baseValues,
        triggerType: 'TASK_CREATED',
        actions: [
          {
            actionType: 'ADD_TASK',
            actionConfig: { taskType: 'GENERAL', taskName: 'Call', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 },
          },
        ],
      }),
    ).rejects.toThrow('Task rules support webhook actions only');
  });
});

const validNotification = {
  actionType: 'NOTIFICATION',
  actionConfig: { recipient: 'LEAD_OWNER', title: 'Lead {{lead.name}} won', message: 'Congratulate {{lead.phone}}' },
} as const;

describe('rule builder validation — add task action', () => {
  const withAddTask = (actionConfig: Record<string, unknown>) =>
    ruleBuilderValidationSchema.validate({
      ...baseValues,
      triggerType: 'NEW_ENQUIRY',
      actions: [{ actionType: 'ADD_TASK', actionConfig }],
    });

  it('accepts an add task action with a task type', async () => {
    await expect(
      withAddTask({ taskType: 'CALL', taskName: 'Call back', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 }),
    ).resolves.toBeTruthy();
  });

  it('requires a task type', async () => {
    await expect(
      withAddTask({ taskName: 'Call back', priority: 'Low', assigneeType: 'LEAD_OWNER', startAfterMinutes: 0 }),
    ).rejects.toThrow('Task type is required');
  });
});

describe('rule builder validation — notification action', () => {
  const withNotification = (actionConfig: Record<string, unknown>) =>
    ruleBuilderValidationSchema.validate({
      ...baseValues,
      triggerType: 'NEW_ENQUIRY',
      actions: [{ actionType: 'NOTIFICATION', actionConfig }],
    });

  it('accepts a notification action on a lead trigger', async () => {
    await expect(
      ruleBuilderValidationSchema.validate({ ...baseValues, triggerType: 'NEW_ENQUIRY', actions: [validNotification] }),
    ).resolves.toBeTruthy();
  });

  it('requires a recipient', async () => {
    await expect(withNotification({ title: 'Hi', message: 'There' })).rejects.toThrow('Recipient is required');
  });

  it('requires a title', async () => {
    await expect(withNotification({ recipient: 'LEAD_OWNER', title: '', message: 'There' })).rejects.toThrow('Title is required');
  });

  it('requires a message', async () => {
    await expect(withNotification({ recipient: 'LEAD_OWNER', title: 'Hi', message: '' })).rejects.toThrow('Message is required');
  });

  it('requires a user only when the recipient is a specific user', async () => {
    await expect(withNotification({ recipient: 'SPECIFIC_USER', title: 'Hi', message: 'There' })).rejects.toThrow('Select a user');
  });
});
