import * as yup from 'yup';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';

export const COUNTRY_PHONE_DIGIT_LENGTH: Record<string, number> = {
  '+91': 10, '+1': 10, '+44': 10, '+971': 9, '+966': 9, '+974': 8, '+965': 8, '+968': 8, '+973': 8, '+20': 10,
  '+998': 9, '+996': 9, '+992': 9, '+7': 10, '+995': 9, '+359': 9, '+49': 10, '+63': 10, '+880': 10, '+94': 9,
  '+977': 10, '+92': 10, '+60': 9, '+65': 8, '+62': 10, '+234': 10, '+90': 10,
};

export function getExpectedPhoneDigitLength(countryCode?: string | null): number {
  if (!countryCode) return 10;
  return COUNTRY_PHONE_DIGIT_LENGTH[countryCode.trim()] ?? 10;
}

const BASE_VALIDATION_SHAPE: Record<string, yup.Schema> = {
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required')
    .test('is-valid-phone', function(value) {
      if (!value) return true;
      const { countryCode } = this.parent;
      const expectedLength = getExpectedPhoneDigitLength(countryCode);
      if (!new RegExp(`^\\d{${expectedLength}}$`).test(value)) {
        return this.createError({ message: `Phone number must be exactly ${expectedLength} digits for country code ${countryCode || '+91'}` });
      }
      return true;
    }),
  countryCode: yup
    .string()
    .required('Country code is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address'),
  sourceId: yup
    .string()
    .required('Source is required'),
  agentId: yup.string(),
  purposeId: yup.string(),
  typeId: yup.string(),
  statusId: yup.string(),
  nextFollowUp: yup.string().test('is-future', 'Next follow-up date cannot be in the past', function(value) {
    if (!value) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(value);
    return selectedDate >= today;
  }),
  notes: yup.string().trim(),
  location: yup.string().trim(),
  address: yup.string().trim(),
};

function getAdditionalFieldsValidationShape(fields: LeadAdditionalApiItem[]): Record<string, yup.Schema> {
  const shape: Record<string, yup.Schema> = {};
  for (const field of fields) {
    const key = `additionalField_${field.fieldKey}`;
    const fieldType = field.fieldType.toLowerCase();
    if (field.isRequired) {
      if (fieldType === 'checkbox') {
        shape[key] = yup
          .array()
          .of(yup.string().required())
          .min(1, `${field.name} is required`);
      } else {
        shape[key] = yup
          .string()
          .trim()
          .required(`${field.name} is required`);
      }
    } else {
      if (fieldType === 'checkbox') {
        shape[key] = yup.array().of(yup.string());
      } else {
        shape[key] = yup.string().trim();
      }
    }
  }
  return shape;
}

/**
 * Validation schema for creating or editing a lead.
 *
 * Used by:
 * - AddLeadDrawer (add lead and edit lead forms, shared by the same drawer)
 *
 * Notes:
 * - Combines the fixed base-field rules with dynamic rules built from the lead's
 *   configured additional fields, so the schema stays in sync with whatever
 *   additional fields are active for the lead's selected purpose.
 * - Frontend validates format/required-ness only; the backend re-validates on submit
 *   and owns any uniqueness checks (e.g. duplicate phone/email).
 */
export function getAddLeadValidationSchema(additionalFields: LeadAdditionalApiItem[]) {
  return yup.object({
    ...BASE_VALIDATION_SHAPE,
    ...getAdditionalFieldsValidationShape(additionalFields),
  });
}
