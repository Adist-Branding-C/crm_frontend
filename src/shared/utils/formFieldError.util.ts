import type { FieldErrorMap, FieldErrorFallback } from '../types/formFieldError.types';

/**
 * Maps a service response's error payload onto Formik field errors.
 *
 * Used by:
 * - account-settings/agent (useAgentCrud)
 *
 * Notes:
 * - `fieldMap` translates backend field names (often snake_case) to frontend Formik field names.
 * - `fallbacks` is tried, in order, only when the backend returns a plain message with no
 *   field-scoped errors (e.g. a generic "Email already exists" string).
 * - Returns the frontend field name that was set, or null if none matched.
 */
export function applyFieldErrors(
  errors: Record<string, string[]> | undefined,
  message: string | undefined,
  field: string | undefined,
  setFieldError: (field: string, msg: string) => void,
  fieldMap: FieldErrorMap,
  fallbacks: FieldErrorFallback[],
): string | null {
  if (field && message) {
    const mapped = fieldMap[field] || field;
    setFieldError(mapped, message);
    return mapped;
  }

  if (errors && typeof errors === 'object') {
    let firstField: string | null = null;
    Object.entries(errors).forEach(([f, msgs]) => {
      const firstMsg = msgs?.[0];
      if (!firstMsg) return;
      const mapped = fieldMap[f] || f;
      if (!firstField) firstField = mapped;
      setFieldError(mapped, firstMsg);
    });
    return firstField;
  }

  if (message) {
    const lower = message.toLowerCase();
    const matched = fallbacks.find((fallback) => lower.includes(fallback.keyword));
    if (matched) {
      setFieldError(matched.field, message);
      return matched.field;
    }
  }

  return null;
}
