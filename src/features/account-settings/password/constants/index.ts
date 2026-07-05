export const PASSWORD_API_ENDPOINTS = {
  CHANGE_PASSWORD: '/auth/change-password',
};

export const INITIAL_PASSWORD_FORM = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_PASSWORD_LENGTH_STRONG = 8;

export const PASSWORD_STRENGTH_LABELS = {
  weak: { strength: 1, text: 'Weak', color: '#ef4444' },
  fair: { strength: 2, text: 'Fair', color: '#f59e0b' },
  good: { strength: 3, text: 'Good', color: '#3b82f6' },
  strong: { strength: 4, text: 'Strong', color: '#22c55e' },
};
