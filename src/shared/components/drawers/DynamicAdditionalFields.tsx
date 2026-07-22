import React from 'react';
import type { DynamicAdditionalFieldsProps } from '../../types/drawers';
import { getFieldKey } from '../../../features/enquiries/utils/additionalFields';

const DynamicAdditionalFields: React.FC<DynamicAdditionalFieldsProps> = ({
  fields,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="additional-fields-section">
      <h4 className="additional-fields-heading">Additional Fields</h4>
      {fields.map((field) => {
        const key = getFieldKey(field.fieldKey);
        const value = values[key] as string | string[] | undefined;
        const error = errors[key] as string | undefined;
        const isTouched = touched[key] as boolean | undefined;
        const fieldType = field.fieldType.toLowerCase();

        return (
          <div className="form-group" key={field.fieldId}>
            <label>
              {field.name}
              {field.isRequired && <span className="required"> *</span>}
            </label>

            {(fieldType === 'text' || fieldType === 'number') && (
              <input
                type={fieldType === 'number' ? 'number' : 'text'}
                name={key}
                placeholder={`Enter ${field.name}`}
                value={(value as string) ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'date' && (
              <input
                type="date"
                name={key}
                value={(value as string) ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'datetime' && (
              <input
                type="datetime-local"
                name={key}
                value={(value as string) ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={error && isTouched ? 'error' : ''}
              />
            )}

            {fieldType === 'dropdown' && (
              <select
                name={key}
                value={(value as string) ?? ''}
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

            {fieldType === 'checkbox' && (
              <div className="checkbox-group">
                {(field.values || []).map((opt) => {
                  const checked = Array.isArray(value) && value.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="checkbox-label"
                    >
                      <input
                        type="checkbox"
                        name={key}
                        value={opt}
                        checked={checked}
                        onChange={(e) => {
                          if (setFieldValue) {
                            const current = (values[key] as string[]) || [];
                            if (e.target.checked) {
                              setFieldValue(key, [...current, opt]);
                            } else {
                              setFieldValue(key, current.filter((v) => v !== opt));
                            }
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            )}

            {error && isTouched && <div className="error-text">{error}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default DynamicAdditionalFields;
