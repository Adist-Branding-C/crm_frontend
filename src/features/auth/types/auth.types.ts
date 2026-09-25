export interface LoginFormData {
  companyId: string
  phone: string
  password: string
  isSuperAdmin: boolean
}

export interface ForgotPasswordFormData {
  phone: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface LoginRequest {
  companyId?: string
  phone: string
  password: string
  isSuperAdmin: boolean
  is_limited?: boolean;
}

export interface AuthUser {
  id: number
  phone: string
  name: string
  staffId?: string
  companyId?: string
  isAdmin?: boolean
  isSuperAdmin?: boolean
  activeCompanyId?: string
  activeCompanyName?: string
}

export interface LoginResponseData {
  id: number
  phone: string
  name: string
  role?: string
  staffId?: string
  companyId?: string
  isAdmin?: boolean
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
  data: { found: boolean }
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
