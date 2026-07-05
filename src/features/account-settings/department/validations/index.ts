import * as yup from 'yup';

export const addDepartmentValidationSchema = yup.object({
  departmentName: yup.string().trim().required('Department name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});

export const editDepartmentValidationSchema = yup.object({
  departmentName: yup.string().trim().required('Department name is required'),
  description: yup.string().trim().required('Description is required').max(500, 'Description must be under 500 characters'),
  status: yup.string().trim().required('Status is required'),
});
