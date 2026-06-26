export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordPayload = Pick<PasswordFormData, 'currentPassword' | 'newPassword'>;

export interface PasswordStrengthResult {
  strength: number;
  text: string;
  color: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}
