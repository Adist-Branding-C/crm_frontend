import axiosInstance from '../../../api/axiosInstance';
import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from '../types/auth.types';

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await axiosInstance.post<ForgotPasswordResponse>('/auth/forgot-password', data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await axiosInstance.post<ResetPasswordResponse>('/auth/reset-password', data);
    return response.data;
  }
}

export const authService = new AuthService();
