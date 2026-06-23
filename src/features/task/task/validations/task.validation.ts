import * as yup from 'yup';

export const addTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  category: yup.string().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  priority: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});

export const editTaskValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().notRequired(),
  category: yup.string().notRequired(),
  scheduledDate: yup.string().notRequired(),
  scheduledTime: yup.string().notRequired(),
  assignedTo: yup.string().notRequired(),
  priority: yup.string().notRequired(),
  status: yup.string().required('Status is required'),
});
