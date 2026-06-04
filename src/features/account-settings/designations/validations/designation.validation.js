import * as yup from 'yup';

export const addDesignationValidationSchema = yup.object({
  designationName: yup.string().required('Designation name is required'),
  description: yup.string(),
  status: yup.string().required('Status is required'),
});
