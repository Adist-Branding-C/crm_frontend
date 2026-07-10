import * as yup from 'yup';
import type { AddLeadFormValues } from '../../../shared/types/drawers';

export const BASE_INITIAL_VALUES: AddLeadFormValues = {
  name: '',
  phone: '',
  email: '',
  agentId: '',
  purposeId: '',
  typeId: '',
  statusId: '',
  sourceId: '',
  nextFollowUp: '',
  notes: '',
  location: '',
  address: '',
};

export const BASE_VALIDATION_SHAPE: Record<string, yup.StringSchema> = {
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required'),
  sourceId: yup
    .string()
    .required('Source is required'),
  agentId: yup.string(),
  purposeId: yup.string(),
  typeId: yup.string(),
  statusId: yup.string(),
  nextFollowUp: yup.string(),
  notes: yup.string().trim(),
  location: yup.string().trim(),
  address: yup.string().trim(),
};
