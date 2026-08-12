export interface ProfileFormData {
  name: string;
  email: string;
  mobile: string;
}

export interface ProfileData {
  customerId: string;
  dateOfRegistration: string;
  accountStatus: string;
  firstLetter: string;
}

export interface ProfileStaff {
  staffId: string;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string | null;
  role: string;
  status: string;
  isAdmin: boolean;
  dateOfRegistration: string;
}

// Kept in sync with the API contract even though the Profile page no longer renders it.
export interface ProfileCredits {
  total: number;
  used: number;
  balance: number;
}

export interface ProfilePlan {
  accountStatus: string;
  activePlanName: string;
  validUntil: string;
  autoRenewal: boolean;
}

export interface ProfileApiData {
  staff: ProfileStaff;
  credits: ProfileCredits;
  plan: ProfilePlan;
}

export interface GetProfileResponse {
  status: boolean;
  message: string;
  data: ProfileApiData;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateProfileResponse {
  status: boolean;
  message: string;
}
