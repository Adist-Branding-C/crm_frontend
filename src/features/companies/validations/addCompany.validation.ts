import * as yup from 'yup';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

/**
 * Validation schema for creating or editing a company (platform tenant).
 *
 * Used by:
 * - AddCompanyModal (add company and edit company forms, shared by the same modal)
 *
 * Notes:
 * - Frontend validates format/required-ness only; the backend re-validates on submit.
 */
export const addCompanyValidationSchema = yup.object({
  name: yup.string().trim().required('Company name is required'),
  contactPersonName: yup.string().trim().required('Contact person name is required'),
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  phoneNumber: yup.string().trim().required('Phone number is required'),
  address: yup.string().trim(),
  gstNumber: yup.string().trim(),
  dateOfRegistration: yup.string(),
  status: yup
    .string()
    .oneOf([CompanyStatus.ACTIVE, CompanyStatus.INACTIVE])
    .required('Status is required'),
});
