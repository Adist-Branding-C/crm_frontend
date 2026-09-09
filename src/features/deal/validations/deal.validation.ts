import * as yup from 'yup';

export const addDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  leadId: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  pipelineId: yup.string().required('Pipeline is required'),
  stageId: yup.string().required('Stage is required'),
  priority: yup.string().required('Priority is required'),
  type: yup.string().required('Type is required'),
  agentId: yup.string().required('Deal Owner is required'),
  startDate: yup.string().notRequired(),
  closeDate: yup.string().notRequired(),
});

export const editDealValidationSchema = yup.object({
  dealName: yup.string().trim().required('Deal name is required'),
  leadId: yup.string().trim().required('Lead is required'),
  mobile: yup.string().trim().required('Mobile is required'),
  amount: yup.string().trim().required('Amount is required'),
  pipelineId: yup.string().required('Pipeline is required'),
  stageId: yup.string().required('Stage is required'),
  priority: yup.string().required('Priority is required'),
  type: yup.string().required('Type is required'),
  agentId: yup.string().required('Deal Owner is required'),
  startDate: yup.string().notRequired(),
  closeDate: yup.string().notRequired(),
});
