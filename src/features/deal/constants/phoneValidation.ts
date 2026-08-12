import { COUNTRY_CODES } from '../../../shared/constants/countryCodes';

interface PhoneLengthRule {
  min: number;
  max: number;
}

/**
 * Expected national phone number length (digits only, excluding the dial
 * code) per country dial code, for the Leads phone field only.
 *
 * Lengths reflect each country's commonly used mobile-number numbering plan
 * (national significant number, no leading trunk "0"). Where a country's
 * plan allows more than one length (e.g. landline vs. mobile), a min-max
 * range is used instead of a fixed length. Countries not present here fall
 * back to `DEFAULT_PHONE_LENGTH_RULE`.
 */
const PHONE_LENGTH_BY_CODE: Record<string, PhoneLengthRule> = {
  '+91': { min: 10, max: 10 }, // India
  '+1': { min: 10, max: 10 }, // United States / Canada
  '+44': { min: 10, max: 11 }, // United Kingdom
  '+61': { min: 9, max: 9 }, // Australia
  '+971': { min: 9, max: 9 }, // United Arab Emirates
  '+966': { min: 9, max: 9 }, // Saudi Arabia
  '+974': { min: 8, max: 8 }, // Qatar
  '+965': { min: 8, max: 8 }, // Kuwait
  '+973': { min: 8, max: 8 }, // Bahrain
  '+968': { min: 8, max: 8 }, // Oman
  '+65': { min: 8, max: 8 }, // Singapore
  '+60': { min: 9, max: 10 }, // Malaysia
  '+62': { min: 9, max: 12 }, // Indonesia
  '+66': { min: 9, max: 9 }, // Thailand
  '+63': { min: 10, max: 10 }, // Philippines
  '+84': { min: 9, max: 10 }, // Vietnam
  '+86': { min: 11, max: 11 }, // China
  '+852': { min: 8, max: 8 }, // Hong Kong
  '+81': { min: 9, max: 10 }, // Japan
  '+82': { min: 9, max: 10 }, // South Korea
  '+92': { min: 10, max: 10 }, // Pakistan
  '+880': { min: 10, max: 10 }, // Bangladesh
  '+94': { min: 9, max: 9 }, // Sri Lanka
  '+977': { min: 10, max: 10 }, // Nepal
  '+49': { min: 10, max: 11 }, // Germany
  '+33': { min: 9, max: 9 }, // France
  '+39': { min: 9, max: 10 }, // Italy
  '+34': { min: 9, max: 9 }, // Spain
  '+31': { min: 9, max: 9 }, // Netherlands
  '+41': { min: 9, max: 9 }, // Switzerland
  '+46': { min: 7, max: 9 }, // Sweden
  '+47': { min: 8, max: 8 }, // Norway
  '+45': { min: 8, max: 8 }, // Denmark
  '+353': { min: 9, max: 9 }, // Ireland
  '+351': { min: 9, max: 9 }, // Portugal
  '+32': { min: 8, max: 9 }, // Belgium
  '+7': { min: 10, max: 10 }, // Russia
  '+27': { min: 9, max: 9 }, // South Africa
  '+234': { min: 10, max: 10 }, // Nigeria
  '+254': { min: 9, max: 9 }, // Kenya
  '+20': { min: 10, max: 10 }, // Egypt
  '+55': { min: 10, max: 11 }, // Brazil
  '+52': { min: 10, max: 10 }, // Mexico
  '+54': { min: 10, max: 11 }, // Argentina
  '+64': { min: 8, max: 9 }, // New Zealand
};

const DEFAULT_PHONE_LENGTH_RULE: PhoneLengthRule = { min: 4, max: 15 };

function getPhoneLengthRule(countryCode: string): PhoneLengthRule {
  return PHONE_LENGTH_BY_CODE[countryCode] ?? DEFAULT_PHONE_LENGTH_RULE;
}

function isValidPhoneForCountry(phone: string, countryCode: string): boolean {
  if (!/^\d+$/.test(phone)) return false;
  const rule = getPhoneLengthRule(countryCode);
  return phone.length >= rule.min && phone.length <= rule.max;
}

function getPhoneLengthErrorMessage(countryCode: string): string {
  const rule = getPhoneLengthRule(countryCode);
  const countryName = COUNTRY_CODES.find(c => c.code === countryCode)?.country ?? countryCode;
  const lengthText = rule.min === rule.max ? `${rule.min}-digit` : `${rule.min}-${rule.max} digit`;
  return `Enter a valid ${lengthText} phone number for ${countryName}`;
}

export { isValidPhoneForCountry, getPhoneLengthErrorMessage };
