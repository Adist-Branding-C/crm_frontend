import React from 'react';
import type { DealAdditionalFieldDef } from '../types/additionalField';
import { getFieldKey } from '../utils/additionalFields';

interface DealDynamicAdditionalFieldsProps {
  fields: DealAdditionalFieldDef[];
  values: Record<string, unknown>;
  errors: Record<string, unknown>;
  touched: Record<string, unknown>;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
}

const DealDynamicAdditionalFields: React.FC<DealDynamicAdditionalFieldsProps> = ({
  fields,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="additional-fields-section">
      <h4 className="additional-fields-heading">Additional Fields</h4>
      {fields.map((field) => {
        const key = getFieldKey(field.fieldKey);
        const value = (values[key] as string) ?? '';
        const error = errors[key] as string | undefined;
        const isTouched = touched[key] as boolean | undefined;
        const fieldType = field.fieldType.toLowerCase();

        return (
          <div className="form-group" key={field.fieldId}>
            <label>
              {field.fieldName}
              {field.isRequired && <span className="required"> *</span>}
            </label>

            {(fieldType === 'text' || fieldType === 'number') && (
              <input
                type={fieldType === 'number' ? 'number' : 'text'}
                name={key}
                placeholder={`Enter ${field.fieldName}`}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'date' && (
              <input
                type="date"
                name={key}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'datetime' && (
              <input
                type="datetime-local"
                name={key}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'dropdown' && (
              <select
                name={key}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              >
                <option value="">Select</option>
                {(field.values || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {error && isTouched && <div className="error-text">{error}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default DealDynamicAdditionalFields;
