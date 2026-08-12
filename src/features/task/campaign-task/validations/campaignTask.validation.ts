import * as yup from 'yup';
import { taskItemBaseValidationSchema } from '../../common/validations/taskItemValidation';

/**
 * Validation schemas for the Campaign Task add/edit drawer.
 *
 * Used by:
 * - CampaignTaskPage's add/edit drawer (Drawer + GenericTaskForm)
 *
 * Notes:
 * - Extends the shared base task-item schema (see task/common/validations/taskItemValidation)
 *   with the Campaign Task's own required association field, campaignId.
 * - Frontend validates required-ness/format only; the backend re-validates on submit.
 */
const campaignTaskValidationSchema = taskItemBaseValidationSchema.shape({
  campaignId: yup.string().required('Campaign is required'),
});

export const addCampaignTaskValidationSchema = campaignTaskValidationSchema;
export const editCampaignTaskValidationSchema = campaignTaskValidationSchema;
