export interface LoginFormData {
  phone: string
  password: string
}

export interface ForgotPasswordFormData {
  phone: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface LoginRequest {
  phone: string
  password: string
}

export interface AuthUser {
  id: number
  phone: string
  name: string
  isSuperAdmin: boolean
}

export interface LoginResponseData {
  id: number
  phone: string
  name: string
  isSuperAdmin: boolean
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  status: boolean
  message: string
  data: LoginResponseData
}

export interface ForgotPasswordRequest {
  phone: string
}

export interface ForgotPasswordResponse {
  status: boolean
  message: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ResetPasswordResponse {
  status: boolean
  message: string
}

export interface RefreshTokenResponse {
  status: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
