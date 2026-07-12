import * as yup from 'yup';

/**
 * Validation schema for the Task add/edit drawer.
 *
 * Used by:
 * - TaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Add and edit use the same schema - there's no edit-only relaxation of any rule.
 * - Unlike Call/Campaign/Deal Task, Task carries a required `categoryId`, so it keeps
 *   its own schema rather than aliasing the shared task-item schema.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
const taskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  categoryId: yup.string().required('Category is required'),
  scheduledDate: yup.string().required('Scheduled date is required'),
  scheduledTime: yup.string().required('Scheduled time is required'),
  assignedTo: yup.string().required('Assigned to is required'),
  leadId: yup.string().notRequired(),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
});

export const addTaskValidationSchema = taskValidationSchema;
export const editTaskValidationSchema = taskValidationSchema;
