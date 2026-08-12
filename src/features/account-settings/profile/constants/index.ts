import type { ProfileFormData, ProfileData, ProfilePlan } from '../types';

export const INITIAL_PROFILE_FORM: ProfileFormData = {
  name: '',
  email: '',
  mobile: '',
};

export const INITIAL_PROFILE_DATA: ProfileData = {
  customerId: '',
  dateOfRegistration: '',
  accountStatus: '-',
  firstLetter: '',
};

export const PROFILE_API_ENDPOINTS = {
  PROFILE: '/profile',
};

export const INITIAL_PROFILE_PLAN: ProfilePlan = {
  accountStatus: '-',
  activePlanName: '-',
  validUntil: '',
  autoRenewal: false,
};
