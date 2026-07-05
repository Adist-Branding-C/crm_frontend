import * as yup from 'yup';

export const addWorkModeValidationSchema = yup.object({
  workModeName: yup.string().trim().required('Work mode name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});

export const editWorkModeValidationSchema = yup.object({
  workModeName: yup.string().trim().required('Work mode name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});
