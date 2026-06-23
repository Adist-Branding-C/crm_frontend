import * as yup from 'yup';

export const addDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  lead: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  status: yup.string().required('Status is required'),
  type: yup.string().required('Type is required'),
  stage: yup.string(),
  priority: yup.string(),
  assignedTo: yup.string(),
  startDate: yup.string().notRequired(),
  endDate: yup.string().notRequired(),
  notes: yup.string(),
});

export const editDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  lead: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  status: yup.string().required('Status is required'),
  type: yup.string().required('Type is required'),
  stage: yup.string(),
  priority: yup.string(),
  assignedTo: yup.string(),
  startDate: yup.string().notRequired(),
  endDate: yup.string().notRequired(),
  notes: yup.string(),
});
