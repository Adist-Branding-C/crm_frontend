import * as yup from 'yup';
import type { ActionType, TriggerType } from '../types';
import { isDealTrigger, isNotificationAllowed, isTaskTrigger } from '../constants';

// Deal and Task triggers are webhook-only; build one shared test per family so the error
// message names the triggering entity while the logic stays in one place.
function webhookOnlyActionTest(matchesTrigger: (triggerType: TriggerType) => boolean) {
  return function (this: yup.TestContext, actions?: Array<{ actionType?: string }>) {
    const triggerType = (this.parent as { triggerType?: TriggerType } | undefined)?.triggerType;
    if (!triggerType || !matchesTrigger(triggerType)) return true;
    return (actions ?? []).every((action) => action?.actionType === 'WEBHOOK');
  };
}

const triggerConfigSchema = yup.object().when('triggerType', (values, schema) => {
  const triggerType = values[0] as TriggerType | '';

  if (triggerType === 'VALUE_CHANGE') {
    return schema.shape({
      fieldName: yup.string().required('Field is required'),
    });
  }

  if (triggerType === 'REASSIGN') {
    return schema.shape({
      statusIds: yup.array().min(1, 'Select at least one status').required('Select at least one status'),
      durationMinutes: yup
        .number()
        .typeError('Enter a number of minutes')
        .integer()
        .min(1, 'Must be at least 1 minute')
        .required('Duration is required'),
      reassignToType: yup.string().oneOf(['STAFF', 'DEPARTMENT']).required('Choose staff or department'),
      reassignToStaffId: yup.string().when('reassignToType', ([reassignToType], s) => (
        reassignToType === 'STAFF' ? s.required('Select a staff member') : s
      )),
      reassignToDepartmentId: yup.string().when('reassignToType', ([reassignToType], s) => (
        reassignToType === 'DEPARTMENT' ? s.required('Select a department') : s
      )),
    });
  }

  if (triggerType === 'NOTIFICATION') {
    return schema.shape({
      statusIds: yup.array().min(1, 'Select at least one status').required('Select at least one status'),
      minAgeMinutes: yup
        .number()
        .typeError('Enter a number of minutes')
        .integer()
        .min(1, 'Must be at least 1 minute')
        .required('Minimum idle time is required'),
    });
  }

  return schema;
});

const actionConfigSchema = yup.object().when('actionType', (values, schema) => {
  const actionType = values[0] as ActionType;

  if (actionType === 'WEBHOOK') {
    return schema.shape({
      url: yup.string().url('Enter a valid URL').required('Webhook URL is required'),
    });
  }

  if (actionType === 'ADD_TASK') {
    return schema.shape({
      taskType: yup.string().oneOf(['GENERAL', 'CALL', 'CAMPAIGN', 'DEAL']).required('Task type is required'),
      taskName: yup.string().required('Task name is required'),
      priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
      assigneeType: yup.string().oneOf(['LEAD_OWNER', 'STAFF']).required(),
      assigneeStaffId: yup.string().when('assigneeType', ([assigneeType], s) => (
        assigneeType === 'STAFF' ? s.required('Select a staff member') : s
      )),
      startAfterMinutes: yup
        .number()
        .typeError('Enter a number of minutes')
        .integer()
        .min(0, 'Cannot be negative')
        .required('Start delay is required'),
    });
  }

  if (actionType === 'ASSIGN_LEAD') {
    return schema.shape({
      assignToType: yup.string().oneOf(['STAFF', 'DEPARTMENT']).required('Choose staff or department'),
      staffId: yup.string().when('assignToType', ([assignToType], s) => (
        assignToType === 'STAFF' ? s.required('Select a staff member') : s
      )),
      departmentId: yup.string().when('assignToType', ([assignToType], s) => (
        assignToType === 'DEPARTMENT' ? s.required('Select a department') : s
      )),
    });
  }

  if (actionType === 'ADD_TO_CAMPAIGN') {
    return schema.shape({
      campaignId: yup.string().required('Campaign is required'),
    });
  }

  if (actionType === 'NOTIFICATION') {
    return schema.shape({
      recipient: yup.string().oneOf(['LEAD_OWNER', 'SPECIFIC_USER']).required('Recipient is required'),
      userId: yup.string().when('recipient', ([recipient], s) => (
        recipient === 'SPECIFIC_USER' ? s.required('Select a user') : s
      )),
      title: yup.string().trim().required('Title is required'),
      message: yup.string().trim().required('Message is required'),
    });
  }

  return schema;
});

// NOTIFICATION actions are lead-only. The UI already hides the option for other triggers;
// this guards the submitted payload (and mirrors the backend's own compatibility check).
function notificationLeadOnlyTest(this: yup.TestContext, actions?: Array<{ actionType?: string }>) {
  const triggerType = (this.parent as { triggerType?: TriggerType } | undefined)?.triggerType;
  if (!triggerType || isNotificationAllowed(triggerType)) return true;
  return (actions ?? []).every((action) => action?.actionType !== 'NOTIFICATION');
}

export const ruleBuilderValidationSchema = yup.object({
  name: yup.string().trim().required('Rule name is required'),
  triggerType: yup
    .string()
    .oneOf([
      'NEW_ENQUIRY',
      'VALUE_CHANGE',
      'REASSIGN',
      'NOTIFICATION',
      'DEAL_CREATED',
      'DEAL_UPDATED',
      'DEAL_STAGE_CHANGED',
      'TASK_CREATED',
      'TASK_UPDATED',
      'TASK_STAGE_CHANGED',
    ])
    .required('Select a trigger'),
  triggerConfig: triggerConfigSchema,
  actions: yup
    .array()
    .of(
      yup.object({
        actionType: yup.string().required(),
        actionConfig: actionConfigSchema,
      }),
    )
    .test('deal-actions-webhook-only', 'Deal rules support webhook actions only', webhookOnlyActionTest(isDealTrigger))
    .test('task-actions-webhook-only', 'Task rules support webhook actions only', webhookOnlyActionTest(isTaskTrigger))
    .test(
      'notification-lead-only',
      'Notification actions can only be used with lead triggers (New Enquiry, Value Change)',
      notificationLeadOnlyTest,
    ),
});
