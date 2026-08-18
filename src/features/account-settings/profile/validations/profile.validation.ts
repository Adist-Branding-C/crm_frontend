import * as yup from 'yup';

/**
 * Validation schema for editing the company profile.
 *
 * Used by:
 * - ProfilePage's Edit Profile drawer
 *
 * Notes:
 * - name/email are the only fields required for the account to function; mobile is an optional
 *   company detail and only length-capped here.
 * - The backend's profile update endpoint currently performs no request validation of its own, so
 *   this is the only layer enforcing required fields and email format.
 */
export const profileValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required').max(200, 'Name must not exceed 200 characters'),
  email: yup.string().trim().email('Enter a valid email address').required('Email is required').max(255, 'Email must not exceed 255 characters'),
  countryCode: yup.string().trim().matches(/^\+\d{1,3}$/, 'Enter a valid country code, e.g. +91'),
  mobile: yup.string().trim().max(20, 'Mobile number must not exceed 20 characters'),
});
