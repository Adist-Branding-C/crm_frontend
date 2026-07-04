import * as yup from 'yup';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';

const FIELD_KEY_PREFIX = 'additionalField_';

export function getFieldKey(fieldKey: string): string {
  return `${FIELD_KEY_PREFIX}${fieldKey}`;
}

export function isAdditionalField(name: string): boolean {
  return name.startsWith(FIELD_KEY_PREFIX);
}

export function stripFieldKeyPrefix(prefixed: string): string {
  return prefixed.startsWith(FIELD_KEY_PREFIX) ? prefixed.slice(FIELD_KEY_PREFIX.length) : prefixed;
}

export function getInitialValues(fields: LeadAdditionalApiItem[]): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const field of fields) {
    const key = getFieldKey(field.fieldKey);
    if (field.fieldType.toLowerCase() === 'checkbox') {
      values[key] = [];
    } else {
      values[key] = '';
    }
  }
  return values;
}

export function buildAdditionalFieldsPayload(
  formValues: Record<string, string | string[]>,
  fieldDefs: { fieldKey: string; fieldId: string; fieldType?: string }[],
): Array<{ fieldId: string; value: string }> {
  const additionalFields: Array<{ fieldId: string; value: string }> = [];
  for (const field of fieldDefs) {
    const key = getFieldKey(field.fieldKey);
    const value = formValues[key];
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      continue;
    }
    additionalFields.push({
      fieldId: field.fieldId,
      value: Array.isArray(value) ? value.join(',') : String(value),
    });
  }
  return additionalFields;
}

export function getValidationSchema(
  fields: LeadAdditionalApiItem[],
): Record<string, yup.Schema> {
  const schema: Record<string, yup.Schema> = {};
  for (const field of fields) {
    const key = getFieldKey(field.fieldKey);
    const fieldType = field.fieldType.toLowerCase();
    if (field.isRequired) {
      if (fieldType === 'checkbox') {
        schema[key] = yup
          .array()
          .of(yup.string().required())
          .min(1, `${field.name} is required`);
      } else {
        schema[key] = yup
          .string()
          .trim()
          .required(`${field.name} is required`);
      }
    } else {
      if (fieldType === 'checkbox') {
        schema[key] = yup.array().of(yup.string());
      } else {
        schema[key] = yup.string().trim();
      }
    }
  }
  return schema;
}

export function getDisplayValue(
  value: string | string[] | undefined,
  field: LeadAdditionalApiItem,
): string {
  if (value == null) return '-';
  if (Array.isArray(value)) {
    if (value.length === 0) return '-';
    return value.join(', ');
  }
  if (field.fieldType.toLowerCase() === 'dropdown' || field.fieldType.toLowerCase() === 'checkbox') {
    const found = field.values?.find((v) => v === value);
    return found ?? value;
  }
  return value || '-';
}
