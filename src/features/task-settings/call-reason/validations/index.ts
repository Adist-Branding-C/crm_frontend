import * as yup from 'yup';

const callReasonValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  status: yup.string().required('Status is required'),
});

export const addCallReasonValidationSchema = callReasonValidationSchema;
export const editCallReasonValidationSchema = callReasonValidationSchema;
