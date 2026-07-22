import * as yup from 'yup';

const categoryValidation = yup
  .string()
  .trim()
  .required('Category is required')
  .min(2, 'Category must be at least 2 characters')
  .max(100, 'Category must not exceed 100 characters');

const statusValidation = yup.string().required('Please select a status');

/**
 * Validation schema for creating and editing a task category.
 *
 * Used by:
 * - TaskCategoryForm (task-category add/edit drawer)
 *
 * Notes:
 * - The same schema is reused for both add and edit modes; no field differs between them.
 * - Checks format and required-ness only; the backend re-validates on submit.
 */
const taskCategoryValidationSchema = yup.object({
  category: categoryValidation,
  status: statusValidation,
});

export const addTaskCategoryValidationSchema = taskCategoryValidationSchema;
export const editTaskCategoryValidationSchema = taskCategoryValidationSchema;
