// Strips non-digits and caps to 10 digits; shared by agent create/update payload building and live phone-field input formatting.
export function sanitizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 10);
}
