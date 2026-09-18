import * as yup from 'yup';
import { RepeatType } from '../constants/taskEnums';

/**
 * Single validation schema for the unified task add/edit form.
 *
 * Used by:
 * - GenericTaskForm (unified mode) on the TaskPage
 *
 * Notes:
 * - Self-contained on purpose: it no longer delegates to the per-type
 *   validations, so the unified flow doesn't couple to call/campaign/deal.
 * - Everything common is only required once a task type is chosen, because the
 *   fields stay disabled until then; otherwise the required errors would fire on
 *   every focused field while the user hasn't picked a type yet.
 * - The type-specific association field (categoryId/leadId/campaignId/dealId)
 *   is required conditionally on the selected taskType - exactly the same rule
 *   the removed per-type schemas enforced, now driven by one place.
 * - Repeat config mirrors the shared taskItemBaseValidationSchema rules (required
 *   + meaningful day value only for Weekly/Monthly repeats).
 */
export const unifiedTaskValidationSchema = yup.object({
  taskType: yup.string().oneOf(['GENERAL', 'CALL', 'CAMPAIGN', 'DEAL'], 'Task type is required'),

  title: yup.string().trim().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Title is required'),
    otherwise: (schema) => schema.optional(),
  }),

  description: yup
    .string()
    .trim()
    .when('taskType', {
      is: (value: string) => Boolean(value),
      then: (schema) => schema.required('Description is required'),
      otherwise: (schema) => schema.optional(),
    })
    .test(
      'is-valid-description',
      'Description cannot be only whitespace',
      function (value) {
        if (value === undefined || value === null || value === '') return true;
        const trimmed = value.trim();
        if (trimmed.length === 0) {
          return this.createError({ message: 'Description cannot be only whitespace' });
        }
        if (trimmed.length > 500) {
          return this.createError({ message: 'Description cannot exceed 500 characters' });
        }
        return true;
      },
    ),

  categoryId: yup.string().when('taskType', {
    is: 'GENERAL',
    then: (schema) => schema.required('Category is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  leadId: yup.string().when('taskType', {
    is: 'CALL',
    then: (schema) => schema.required('Lead is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  campaignId: yup.string().when('taskType', {
    is: 'CAMPAIGN',
    then: (schema) => schema.required('Campaign is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  dealId: yup.string().when('taskType', {
    is: 'DEAL',
    then: (schema) => schema.required('Deal is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  scheduledDate: yup.string().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Scheduled date is required'),
    otherwise: (schema) => schema.optional(),
  }),

  scheduledTime: yup.string().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Scheduled time is required'),
    otherwise: (schema) => schema.optional(),
  }),

  assignedTo: yup.string().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Assigned to is required'),
    otherwise: (schema) => schema.optional(),
  }),

  priority: yup.string().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Priority is required'),
    otherwise: (schema) => schema.optional(),
  }),

  status: yup.string().when('taskType', {
    is: (value: string) => Boolean(value),
    then: (schema) => schema.required('Status is required'),
    otherwise: (schema) => schema.optional(),
  }),

  workflowId: yup.string(),
  stageId: yup.string(),

  repeatType: yup
    .string()
    .oneOf(Object.values(RepeatType))
    .default(RepeatType.NEVER),

  repeatConfig: yup
    .object()
    .when('repeatType', {
      is: (value: string) => value === RepeatType.DAILY || value === RepeatType.NEVER,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema
          .required('Repeat configuration is required')
          .test(
            'has-repeat-config',
            'Select the day you want the task to repeat on',
            function (value: Record<string, unknown> | undefined) {
              if (!value) return false;
const repeatType = this.parent.repeatType;
if (repeatType === RepeatType.WEEKLY) {
  return typeof value.dayOfWeek === 'number';
}
if (repeatType === RepeatType.MONTHLY) {
                return value.dayOfMonth !== undefined && value.dayOfMonth !== null && value.dayOfMonth !== '';
              }
              return true;
            },
          ),
    }),
});