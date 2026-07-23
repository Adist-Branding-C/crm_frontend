import * as yup from 'yup';
import { taskItemValidationSchema } from '../../common/validations/taskItemValidation';

/**
 * Validation schema for the Task add/edit drawer.
 *
 * Used by:
 * - TaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Add and edit use the same schema - there's no edit-only relaxation of any rule.
 * - Unlike Call/Campaign/Deal Task, Task carries a required `categoryId`, so it extends
 *   the shared task-item schema with that one extra field instead of aliasing it directly.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
const taskValidationSchema = taskItemValidationSchema.shape({
  categoryId: yup.string().required('Category is required'),
});

export const addTaskValidationSchema = taskValidationSchema;
export const editTaskValidationSchema = taskValidationSchema;
