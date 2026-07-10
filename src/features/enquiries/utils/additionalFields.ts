import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';

const FIELD_KEY_PREFIX = 'additionalField_';

export function getFieldKey(fieldKey: string): string {
  return `${FIELD_KEY_PREFIX}${fieldKey}`;
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
