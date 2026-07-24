import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';

/**
 * Splits a combined "mobile" value (e.g. "+91 9876543210") into a dial code
 * and national number. Deals saved before the country-code dropdown existed
 * store plain digits with no leading "+"; those fall back to the default
 * country code.
 */
export function splitMobileValue(mobile: string | undefined | null): { countryCode: string; number: string } {
  const trimmed = (mobile || '').trim();
  if (!trimmed.startsWith('+')) {
    return { countryCode: DEFAULT_COUNTRY_CODE, number: trimmed.replace(/\D/g, '') };
  }
  const codes = [...new Set(COUNTRY_CODES.map(c => c.code))].sort((a, b) => b.length - a.length);
  const matchedCode = codes.find(code => trimmed.startsWith(code)) ?? DEFAULT_COUNTRY_CODE;
  return { countryCode: matchedCode, number: trimmed.slice(matchedCode.length).replace(/\D/g, '') };
}

/** Joins a dial code and national number back into the combined "mobile" string sent to the API. */
export function combineMobileValue(countryCode: string | undefined, number: string | undefined): string {
  const digits = (number || '').trim();
  if (!digits) return '';
  return `${countryCode || DEFAULT_COUNTRY_CODE}${digits}`;
}
