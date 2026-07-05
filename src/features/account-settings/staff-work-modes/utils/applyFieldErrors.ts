const FIELD_MAP: Record<string, string> = {
  work_mode_name: 'workModeName',
  name: 'workModeName',
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
    if (lower.includes('work_mode_name') || lower.includes('name') || lower.includes('workmode')) { setFieldError('workModeName', message); return 'workModeName'; }
  }
  return null;
}
