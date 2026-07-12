import * as yup from 'yup';

/**
 * Validation schema shared by the task-type entities that don't carry a category field.
 *
 * Used by:
 * - Call Task add/edit drawer (call-task feature)
 * - Campaign Task add/edit drawer (campaign-task feature)
 * - Deal Task add/edit drawer (deal-task feature)
 *
 * Notes:
 * - The three consumers previously each defined this exact same schema locally;
 *   it's consolidated here since the field set and rules are identical across them.
 * - Add and edit use the same schema - there's no edit-only relaxation of any rule.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
export const taskItemValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  scheduledDate: yup.string().required('Scheduled date is required'),
  scheduledTime: yup.string().required('Scheduled time is required'),
  assignedTo: yup.string().required('Assigned to is required'),
  leadId: yup.string().notRequired(),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
});
