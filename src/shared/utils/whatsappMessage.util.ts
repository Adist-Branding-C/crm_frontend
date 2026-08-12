// Shared by every "click WhatsApp -> pick a template -> open wa.me" entry point
// (Lead detail, Deal actions) so the phone-normalization and {{variable}}
// substitution logic exists in exactly one place.

const TEMPLATE_VARIABLE_PATTERN = /{{\s*(\w+)\s*}}/g;

export function normalizeWhatsappNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

// Unmatched variables (e.g. a missing lead name) substitute to '' rather than
// being left as literal "{{name}}" text or blocking the send.
export function substituteTemplateVariables(
  template: string,
  variables: Record<string, string | undefined>,
): string {
  return template.replace(TEMPLATE_VARIABLE_PATTERN, (_match, key: string) => variables[key] ?? '');
}

export function buildWhatsappUrl(phone: string, message?: string): string {
  const number = normalizeWhatsappNumber(phone);
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
