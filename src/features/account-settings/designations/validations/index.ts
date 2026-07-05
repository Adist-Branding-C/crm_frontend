import * as yup from 'yup';

export const addDesignationValidationSchema = yup.object({
  designationName: yup.string().trim().required('Designation name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});

export const editDesignationValidationSchema = yup.object({
  designationName: yup.string().trim().required('Designation name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});
