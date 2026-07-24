import * as yup from 'yup';

export const addLeadValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  location: yup.string().required('Location is required'),
  address: yup.string().required('Address is required'),
  agentId: yup.string().required('Assigned staff is required'),
  purpose: yup.string().required('Purpose is required'),
  type: yup.string().required('Type is required'),
  statusId: yup.string().required('Status is required'),
  source: yup.string().required('Source is required'),
  nextFollowUp: yup.string().nullable(),
  notes: yup.string().nullable(),
});
