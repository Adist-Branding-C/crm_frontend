import * as yup from 'yup';
import { VALUE_CHANGE_FIELD_OPTIONS } from '../constants';

const VALUE_CHANGE_FIELD_VALUES = VALUE_CHANGE_FIELD_OPTIONS.map((o) => o.value);

// Trigger config shape depends on triggerType - built as one function-form
// .when() rather than chained is/then branches, since yup v1's function form
// handles "exactly one of several mutually exclusive shapes" more cleanly.
const triggerConfigSchema = yup.object().when('triggerType', ([triggerType], schema) => {
  switch (triggerType) {
    case 'VALUE_CHANGE':
      return schema.shape({
        field: yup.string().oneOf(VALUE_CHANGE_FIELD_VALUES, 'Select a valid field').required('Field is required'),
        fromValue: yup.string().optional(),
        toValue: yup.string().optional(),
      });
    case 'REASSIGN':
      return schema.shape({
        statusIds: yup.array().of(yup.string().required()).min(1, 'Select at least one status').required('Select at least one status'),
        durationMinutes: yup.number().typeError('Enter a number').positive('Must be positive').required('Duration is required'),
        reassignTo: yup.object({
          type: yup.string().oneOf(['STAFF', 'DEPARTMENT']).required('Select who to reassign to'),
          staffId: yup.string().when('type', ([type], s) => (type === 'STAFF' ? s.required('Staff is required') : s)),
          departmentId: yup.string().when('type', ([type], s) => (type === 'DEPARTMENT' ? s.required('Department is required') : s)),
        }).required('Reassign target is required'),
      });
    case 'NOTIFICATION':
      return schema.shape({
        statusIds: yup.array().of(yup.string().required()).min(1, 'Select at least one status').required('Select at least one status'),
        minAgeMinutes: yup.number().typeError('Enter a number').positive('Must be positive').required('Minimum age is required'),
      });
    default:
      return schema;
  }
});

// Action config shape depends on the action's own actionType (nested inside
// the actions[] array, itself conditional on the rule's triggerType via the
// filtered dropdown options - see AutomationBuilderPage).
const actionConfigSchema = yup.object().when('actionType', ([actionType], schema) => {
  switch (actionType) {
    case 'WEBHOOK':
      return schema.shape({
        url: yup.string().url('Enter a valid URL').required('Webhook URL is required'),
        sourceIds: yup.array().of(yup.string()).optional(),
        purposeIds: yup.array().of(yup.string()).optional(),
      });
    case 'ADD_TASK':
      return schema.shape({
        taskName: yup.string().trim().required('Task name is required'),
        description: yup.string().optional(),
        priority: yup.string().optional(),
        assigneeType: yup.string().oneOf(['LEAD_OWNER', 'STAFF']).required('Select an assignee'),
        assigneeStaffId: yup.string().when('assigneeType', ([assigneeType], s) => (assigneeType === 'STAFF' ? s.required('Staff is required') : s)),
        startAfterMinutes: yup.number().typeError('Enter a number').min(0, 'Must be 0 or more').required('Start after is required'),
        deadlineAfterMinutes: yup.number().typeError('Enter a number').min(0, 'Must be 0 or more').optional(),
      });
    case 'ASSIGN_LEAD':
      return schema.shape({
        assignToType: yup.string().oneOf(['STAFF', 'DEPARTMENT']).required('Select who to assign to'),
        staffId: yup.string().when('assignToType', ([assignToType], s) => (assignToType === 'STAFF' ? s.required('Staff is required') : s)),
        departmentId: yup.string().when('assignToType', ([assignToType], s) => (assignToType === 'DEPARTMENT' ? s.required('Department is required') : s)),
        sourceIds: yup.array().of(yup.string()).optional(),
        statusIds: yup.array().of(yup.string()).optional(),
        purposeIds: yup.array().of(yup.string()).optional(),
      });
    case 'ADD_TO_CAMPAIGN':
      return schema.shape({
        campaignId: yup.string().required('Campaign is required'),
        sourceIds: yup.array().of(yup.string()).optional(),
        statusIds: yup.array().of(yup.string()).optional(),
        purposeIds: yup.array().of(yup.string()).optional(),
      });
    default:
      return schema;
  }
});

export const automationValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Automation name is required')
    .min(2, 'Automation name must be at least 2 characters')
    .max(150, 'Automation name must not exceed 150 characters'),
  triggerType: yup
    .string()
    .oneOf(['NEW_ENQUIRY', 'VALUE_CHANGE', 'REASSIGN', 'NOTIFICATION'], 'Please select a valid automation type')
    .required('Please select an automation type'),
  isActive: yup.boolean().required(),
  triggerConfig: triggerConfigSchema,
  actions: yup.array().of(
    yup.object({
      actionType: yup.string().oneOf(['WEBHOOK', 'ADD_TASK', 'ASSIGN_LEAD', 'ADD_TO_CAMPAIGN'], 'Select a valid action type').required('Select an action type'),
      config: actionConfigSchema,
    }),
  ),
});
