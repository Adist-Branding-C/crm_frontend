import * as yup from 'yup';

const categoryValidation = yup
  .string()
  .trim()
  .required('Category is required')
  .min(2, 'Category must be at least 2 characters')
  .max(100, 'Category must not exceed 100 characters');

const actionValidation = yup
  .string()
  .trim()
  .required('Action is required')
  .min(2, 'Action must be at least 2 characters')
  .max(100, 'Action must not exceed 100 characters');

const taskCategoryValidationSchema = yup.object({
  category: categoryValidation,
  action: actionValidation,
});

export const addTaskCategoryValidationSchema = taskCategoryValidationSchema;
export const editTaskCategoryValidationSchema = taskCategoryValidationSchema;
