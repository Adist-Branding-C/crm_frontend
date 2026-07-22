import * as yup from 'yup';
import type { ActionType, TriggerType } from '../types';

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

  return schema;
});

export const ruleBuilderValidationSchema = yup.object({
  name: yup.string().trim().required('Rule name is required'),
  triggerType: yup
    .string()
    .oneOf(['NEW_ENQUIRY', 'VALUE_CHANGE', 'REASSIGN', 'NOTIFICATION'])
    .required('Select a trigger'),
  triggerConfig: triggerConfigSchema,
  actions: yup.array().of(
    yup.object({
      actionType: yup.string().required(),
      actionConfig: actionConfigSchema,
    }),
  ),
});
