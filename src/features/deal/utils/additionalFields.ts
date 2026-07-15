import type { DealAdditionalFieldDef } from '../types/interface';

const FIELD_KEY_PREFIX = 'additionalField_';

export function getFieldKey(fieldKey: string): string {
  return `${FIELD_KEY_PREFIX}${fieldKey}`;
}

export function getInitialValues(fields: DealAdditionalFieldDef[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    values[getFieldKey(field.fieldKey)] = '';
  }
  return values;
}

export function buildAdditionalFieldsPayload(
  formValues: Record<string, string>,
  fieldDefs: { fieldKey: string; fieldId: string }[],
): Array<{ fieldId: string; value: string }> {
  const additionalFields: Array<{ fieldId: string; value: string }> = [];
  for (const field of fieldDefs) {
    const value = formValues[getFieldKey(field.fieldKey)];
    if (value === undefined || value === null || value === '') {
      continue;
    }
    additionalFields.push({ fieldId: field.fieldId, value: String(value) });
  }
  return additionalFields;
}
