import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import type { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, LoginData } from '../types/auth.types';
import { AUTH_API_ENDPOINTS } from '../constants/authApiEndpoints';

class AuthService {
  async login(data: LoginRequest): Promise<ApiResponse<LoginData>> {
    const response = await axiosInstance.post<ApiResponse<LoginData>>(AUTH_API_ENDPOINTS.LOGIN, data);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>(AUTH_API_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    const response = await axiosInstance.post<ApiResponse>(AUTH_API_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
  }
}

export const authService = new AuthService();
