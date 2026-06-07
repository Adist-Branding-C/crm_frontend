import * as yup from 'yup';

const taskCategoryValidationSchema = yup.object({
  category: yup.string().trim().required('Category is required'),
  action: yup.string().trim().required('Action is required'),
});

export const addTaskCategoryValidationSchema = taskCategoryValidationSchema;
export const editTaskCategoryValidationSchema = taskCategoryValidationSchema;
