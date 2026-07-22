import * as yup from 'yup';

export const addDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  leadId: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  statusId: yup.string().required('Status is required'),
  typeId: yup.string().required('Type is required'),
  agentId: yup.string().required('Assign Agent is required'),
  startDate: yup.string().notRequired(),
  endDate: yup.string().notRequired(),
});

export const editDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  leadId: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  statusId: yup.string().required('Status is required'),
  typeId: yup.string().required('Type is required'),
  agentId: yup.string().required('Assign Agent is required'),
  startDate: yup.string().notRequired(),
  endDate: yup.string().notRequired(),
});
