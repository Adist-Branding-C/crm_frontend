export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordPayload = Pick<PasswordFormData, 'currentPassword' | 'newPassword'>;

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}
