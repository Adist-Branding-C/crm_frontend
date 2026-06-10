import * as yup from 'yup';

export const addDealTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  dealName: yup.string().trim().notRequired(),
  dealStage: yup.string().trim().notRequired(),
  amount: yup.string().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});

export const editDealTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  dealName: yup.string().trim().notRequired(),
  dealStage: yup.string().trim().notRequired(),
  amount: yup.string().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});
