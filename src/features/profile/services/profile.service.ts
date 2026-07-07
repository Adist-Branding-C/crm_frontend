import axiosInstance from '../../../api/axiosInstance';
import { PROFILE_API_ENDPOINTS } from '../constants';
import type { GetProfileResponse, UpdateProfileResponse, ProfileFormData } from '../types';

class ProfileService {
  async getProfile(): Promise<GetProfileResponse> {
    const response = await axiosInstance.get<GetProfileResponse>(PROFILE_API_ENDPOINTS.PROFILE);
    return response.data;
  }

  async updateProfile(payload: ProfileFormData): Promise<UpdateProfileResponse> {
    const body = {
      companyName: payload.name,
      email: payload.email,
      phone: payload.mobile,
      address: payload.address,
      gstNumber: payload.gstNumber,
    };
    const response = await axiosInstance.patch<UpdateProfileResponse>(PROFILE_API_ENDPOINTS.PROFILE, body);
    return response.data;
  }
}

export const profileService = new ProfileService();
