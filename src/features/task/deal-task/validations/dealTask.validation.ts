import * as yup from 'yup';
import { taskItemBaseValidationSchema } from '../../common/validations/taskItemValidation';

/**
 * Validation schemas for the Deal Task add/edit drawer.
 *
 * Used by:
 * - DealTaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Extends the shared base task-item schema (see task/common/validations/taskItemValidation)
 *   with the Deal Task's own required association field, dealId.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
const dealTaskValidationSchema = taskItemBaseValidationSchema.shape({
  dealId: yup.string().required('Deal is required'),
});

export const addDealTaskValidationSchema = dealTaskValidationSchema;
export const editDealTaskValidationSchema = dealTaskValidationSchema;
