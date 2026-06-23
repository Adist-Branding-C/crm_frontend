import * as yup from 'yup';

export const addCallTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  contactName: yup.string().trim().notRequired(),
  contactPhone: yup.string().trim().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  duration: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});

export const editCallTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  contactName: yup.string().trim().notRequired(),
  contactPhone: yup.string().trim().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  duration: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});
