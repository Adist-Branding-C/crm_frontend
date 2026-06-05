import * as yup from 'yup';

export const addBranchValidationSchema = yup.object({
  name: yup.string().required('Branch name is required'),
  description: yup.string(),
  status: yup.string().required('Status is required'),
});
