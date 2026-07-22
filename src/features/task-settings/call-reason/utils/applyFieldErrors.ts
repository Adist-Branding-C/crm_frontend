const FIELD_MAP: Record<string, string> = {};

/**
 * Applies a parsed API error to Formik field errors, preferring an explicit field/message
 * pair, then a field-scoped errors map, then a keyword match against a plain message.
 *
 * Used by:
 * - campaigns (useCampaignSubmitHandlers), deal-settings/status (useDealStatusSubmitHandlers)
 *
 * Notes:
 * - Lives under call-reason/ for historical reasons but is consumed only by other feature
 *   modules; out of scope to relocate in this pass since that would require touching those
 *   external call sites. New task-settings code should use the shared
 *   `useSubmitErrorHandler` hook instead, which every task-settings sub-module already does.
 */
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
    if (lower.includes('name')) { setFieldError('name', message); return 'name'; }
  }
  return null;
}
