import * as yup from 'yup';

/**
 * Base validation schema shared by the task-type entities that don't carry a category
 * field - everything except the entity's own association field (leadId/campaignId/dealId).
 *
 * Used by:
 * - taskItemValidationSchema below (adds leadId, for Call Task)
 * - Campaign Task and Deal Task validation files (each adds its own association field)
 *
 * Notes:
 * - Add and edit use the same schema - there's no edit-only relaxation of any rule.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
export const taskItemBaseValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
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
  scheduledDate: yup.string().required('Scheduled date is required'),
  scheduledTime: yup.string().required('Scheduled time is required'),
  assignedTo: yup.string().required('Assigned to is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
});

/**
 * Validation schema for task-type entities associated with a Lead.
 *
 * Used by:
 * - Call Task add/edit drawer (call-task feature)
 * - Task add/edit drawer (task feature), extended further with categoryId
 */
export const taskItemValidationSchema = taskItemBaseValidationSchema.shape({
  leadId: yup.string().required('Lead is required'),
});
