import { taskItemValidationSchema } from '../../shared/validations/taskItemValidation';

/**
 * Validation schemas for the Call Task add/edit drawer.
 *
 * Used by:
 * - CallTaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Aliases the shared task-item schema (see task/shared/validations/taskItemValidation) -
 *   Call Task has no category field, so it doesn't need its own field set.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
export const addCallTaskValidationSchema = taskItemValidationSchema;
export const editCallTaskValidationSchema = taskItemValidationSchema;
