import axiosInstance from "../../../api/axiosInstance";
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth.types";
import { AUTH_API_ENDPOINTS } from "../constants/authApiEndpoints";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      AUTH_API_ENDPOINTS.LOGIN,
      {
        ...data,
        is_limited: true,
      },
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      AUTH_API_ENDPOINTS.FORGOT_PASSWORD,
      data,
    );
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    const response = await axiosInstance.post<ResetPasswordResponse>(
      AUTH_API_ENDPOINTS.RESET_PASSWORD,
      data,
    );
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }

  async logout(): Promise<void> {
    await axiosInstance.post(AUTH_API_ENDPOINTS.LOGOUT);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const response = await axiosInstance.post(
      AUTH_API_ENDPOINTS.REFRESH,
      { refreshToken }
    );
    return response.data;
  }
}

export const authService = new AuthService();
