const FIELD_KEY_PREFIX = 'additionalField_';
export function getFieldKey(fieldKey) {
    return `${FIELD_KEY_PREFIX}${fieldKey}`;
}
export function getInitialValues(fields) {
    const values = {};
    for (const field of fields) {
        const key = getFieldKey(field.fieldKey);
        if (field.fieldType.toLowerCase() === 'checkbox') {
            values[key] = [];
        }
        else {
            values[key] = '';
        }
    }
    return values;
}
export function buildAdditionalFieldsPayload(formValues, fieldDefs) {
    const additionalFields = [];
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
//# sourceMappingURL=additionalFields.js.map