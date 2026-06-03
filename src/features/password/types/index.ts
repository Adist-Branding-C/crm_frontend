export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordStrengthResult {
  strength: number;
  text: string;
  color: string;
}
