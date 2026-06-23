import * as yup from 'yup';

export const addCampaignTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  campaignName: yup.string().trim().notRequired(),
  campaignType: yup.string().trim().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});

export const editCampaignTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  campaignName: yup.string().trim().notRequired(),
  campaignType: yup.string().trim().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});
