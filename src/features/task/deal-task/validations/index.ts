import { taskItemValidationSchema } from '../../shared/validations/taskItemValidation';

/**
 * Validation schemas for the Deal Task add/edit drawer.
 *
 * Used by:
 * - DealTaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Aliases the shared task-item schema (see task/shared/validations/taskItemValidation) -
 *   Deal Task has no category field, so it doesn't need its own field set.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
export const addDealTaskValidationSchema = taskItemValidationSchema;
export const editDealTaskValidationSchema = taskItemValidationSchema;
