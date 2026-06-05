import * as yup from 'yup';

export const addDepartmentValidationSchema = yup.object({
  departmentName: yup.string().trim().required('Department name is required'),
  description: yup.string().trim(),
  status: yup.string().required('Status is required'),
});
