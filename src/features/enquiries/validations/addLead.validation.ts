import * as yup from 'yup';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';

const BASE_VALIDATION_SHAPE: Record<string, yup.StringSchema> = {
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required'),
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
  nextFollowUp: yup.string(),
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
