import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';

/**
 * Backend-field-name -> Formik-field-name remapping for task-item submit errors.
 *
 * Used by:
 * - useTaskCrud, useCallTaskCrud, useCampaignTaskCrud, useDealTaskCrud (via useSubmitErrorHandler).
 *
 * Notes:
 * - Empty because the task-item endpoints already return field names matching the
 *   frontend's Formik field names; kept as an explicit empty map (rather than omitting
 *   fieldMap entirely) to match useSubmitErrorHandler's required shape.
 */
export const TASK_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when a task-item submit fails with a plain message
 * and no field-scoped errors (e.g. a generic validation string with no field key).
 *
 * Used by:
 * - useTaskCrud, useCallTaskCrud, useCampaignTaskCrud, useDealTaskCrud (via useSubmitErrorHandler).
 *
 * Notes:
 * - Order matters; the first matching keyword wins.
 */
export const TASK_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'title', field: 'title' },
  { keyword: 'description', field: 'description' },
  { keyword: 'date', field: 'scheduledDate' },
  { keyword: 'time', field: 'scheduledTime' },
];
