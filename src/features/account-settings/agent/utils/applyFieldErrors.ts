const FIELD_MAP: Record<string, string> = {
  full_name: 'fullName',
  name: 'fullName',
  email: 'email',
  phone: 'phone',
  phone_number: 'phone',
  password: 'password',
  confirm_password: 'confirmPassword',
};

export function applyFieldErrors(
  errors: Record<string, string[]> | undefined,
  message: string | undefined,
  field: string | undefined,
  setFieldError: (field: string, msg: string) => void,
): string | null {
  if (field && message) {
    const mapped = FIELD_MAP[field] || field;
    setFieldError(mapped, message);
    return mapped;
  }
  if (errors && typeof errors === 'object') {
    let firstField: string | null = null;
    Object.entries(errors).forEach(([f, msgs]) => {
      const mapped = FIELD_MAP[f] || f;
      if (msgs?.length && !firstField) firstField = mapped;
      if (msgs?.length) setFieldError(mapped, msgs[0]!);
    });
    return firstField;
  }
  if (message) {
    const lower = message.toLowerCase();
    if (lower.includes('email')) { setFieldError('email', message); return 'email'; }
    if (lower.includes('phone')) { setFieldError('phone', message); return 'phone'; }
    if (lower.includes('password')) { setFieldError('password', message); return 'password'; }
    if (lower.includes('name')) { setFieldError('fullName', message); return 'fullName'; }
  }
  return null;
}
