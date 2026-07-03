import type { ApiResponse } from '../../../shared/types/common';

export interface LoginRequest {
  phone: string
  password: string
}

export interface AuthUser {
  id: number
  phone: string
  name: string
}

export interface LoginData {
  id: number
  phone: string
  name: string
  accessToken: string
  refreshToken: string
}

export interface ForgotPasswordRequest {
  phone: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface RefreshTokenData {
  accessToken: string
  refreshToken: string
}

export type {
  ApiResponse,
};
