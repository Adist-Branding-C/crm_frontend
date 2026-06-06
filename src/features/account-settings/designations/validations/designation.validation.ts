import * as yup from 'yup';

export const addDesignationValidationSchema = yup.object({
  designationName: yup.string().trim().required('Designation name is required'),
  description: yup.string().trim(),
  status: yup.string().required('Status is required'),
});

export const editDesignationValidationSchema = yup.object({
  designationName: yup.string().trim().required('Designation name is required'),
  description: yup.string().trim(),
  status: yup.string().required('Status is required'),
});
