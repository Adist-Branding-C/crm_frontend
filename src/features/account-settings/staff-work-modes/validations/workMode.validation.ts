import * as yup from 'yup';

export const addWorkModeValidationSchema = yup.object({
  workModeName: yup.string().trim().required('Work mode name is required'),
  description: yup.string().trim(),
  status: yup.string().required('Status is required'),
});

export const editWorkModeValidationSchema = yup.object({
  workModeName: yup.string().trim().required('Work mode name is required'),
  description: yup.string().trim(),
  status: yup.string().required('Status is required'),
});
