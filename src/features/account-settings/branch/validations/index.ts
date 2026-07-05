import * as yup from 'yup';

export const addBranchValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});

export const editBranchValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});
