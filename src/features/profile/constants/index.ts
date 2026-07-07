import type { ProfileFormData, ProfileData } from '../types';

export const INITIAL_PROFILE_FORM: ProfileFormData = {
  name: '',
  email: '',
  mobile: '',
  address: '',
  gstNumber: '',
};

export const INITIAL_PROFILE_DATA: ProfileData = {
  customerId: '',
  dateOfRegistration: '-',
  accountStatus: 'Active',
  firstLetter: '',
};

export const PROFILE_API_ENDPOINTS = {
  PROFILE: '/profile',
};
