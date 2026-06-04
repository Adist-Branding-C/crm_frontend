import * as yup from 'yup';

export const addWorkModeValidationSchema = yup.object({
  workModeName: yup.string().required('Work mode name is required'),
  description: yup.string(),
  status: yup.string().required('Status is required'),
});
