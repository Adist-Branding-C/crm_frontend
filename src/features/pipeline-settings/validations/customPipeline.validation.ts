import * as yup from 'yup';
import { GROUP_BY_FIELD_OPTIONS } from '../constants';

/**
 * Validation schema for adding or editing a custom pipeline.
 *
 * Used by:
 * - CustomPipelineForm (add and edit modes)
 *
 * Notes:
 * - groupByField is restricted to the same allow-list the backend validates against
 *   (@IsIn in custom-pipeline.dto.ts) so an invalid value never reaches the API.
 * - entityType has no edit-mode UI (the backend's UpdateCustomPipelineDto doesn't
 *   accept it either — a pipeline's target entity is fixed at creation).
 */
const ALLOWED_GROUP_BY_FIELD_VALUES = GROUP_BY_FIELD_OPTIONS.map((o) => o.value);

export const customPipelineValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must not exceed 255 characters'),
  entityType: yup
    .mixed<'lead' | 'deal' | 'task'>()
    .oneOf(['lead', 'deal', 'task'], 'Select a valid entity type')
    .required('Applies To is required'),
  groupByField: yup
    .string()
    .oneOf(ALLOWED_GROUP_BY_FIELD_VALUES, 'Select a valid group-by field')
    .required('Group By is required'),
  isActive: yup.boolean().required(),
});
