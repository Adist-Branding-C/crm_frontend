export interface ProfileFormData {
  name: string;
  email: string;
  mobile: string;
  address: string;
  gstNumber: string;
}

export interface ProfileData {
  customerId: string;
  dateOfRegistration: string;
  accountStatus: string;
  firstLetter: string;
}

export interface ProfileApiData {
  companyId: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
}

export interface GetProfileResponse {
  status: boolean;
  message: string;
  data: ProfileApiData;
}

export interface UpdateProfileResponse {
  status: boolean;
  message: string;
}
