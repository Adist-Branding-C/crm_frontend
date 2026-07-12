import type { CsvColumn } from '../../../../shared/types/csv';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import type { TaskCategoryItem } from '../types/interface';

/**
 * Task Category API endpoint paths.
 *
 * Used by:
 * - TaskCategoryApiService (fetchAll/create/update/delete)
 */
export const TASK_CATEGORY_API_ENDPOINTS = {
  GET_ALL: '/task-category',
  CREATE: '/task-category',
  UPDATE: (id: number) => `/task-category/${id}`,
  DELETE: (id: number) => `/task-category/${id}`,
};

/**
 * Blank Formik initial state for the task-category add drawer.
 *
 * Used by:
 * - TaskCategoryPage (Add Task Category drawer)
 */
export const ADD_TASK_CATEGORY_INITIAL_VALUES = {
  category: '',
  action: '',
};

/**
 * Maps backend task-category field names to frontend Formik field names.
 *
 * Used by:
 * - useTaskCategoryCrud (create/update error handling, via shared useSubmitErrorHandler)
 *
 * Notes:
 * - Empty because the backend already uses the same field names as the form; kept for
 *   parity with the shared useSubmitErrorHandler contract.
 */
export const TASK_CATEGORY_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useTaskCategoryCrud (create/update error handling, via shared useSubmitErrorHandler)
 */
export const TASK_CATEGORY_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'category', field: 'category' },
  { keyword: 'action', field: 'action' },
];

/**
 * CSV column definitions for task-category export.
 *
 * Used by:
 * - TaskCategoryPage (Export button)
 */
export const TASK_CATEGORY_CSV_COLUMNS: CsvColumn<TaskCategoryItem>[] = [
  { header: 'Category', value: (item) => item.category },
  { header: 'Action', value: (item) => item.action },
];
