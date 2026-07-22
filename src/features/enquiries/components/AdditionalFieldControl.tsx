import React from 'react';
import type { AdditionalFieldControlProps } from '../types/component.types';

const AdditionalFieldControl: React.FC<AdditionalFieldControlProps> = ({ field, value, onChange }) => {
  switch (field.fieldType.toLowerCase()) {
    case 'dropdown':
      return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select {field.name}</option>
          {field.values.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      );

    case 'number':
      return (
        <input type="number" placeholder={`Enter ${field.name}`} value={value} onChange={(e) => onChange(e.target.value)} />
      );

    case 'text':
      return (
        <input type="text" placeholder={`Enter ${field.name}`} value={value} onChange={(e) => onChange(e.target.value)} />
      );

    case 'date':
      return (
        <input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
      );

    case 'checkbox':
      return (
        <div className="filter-checkbox-group">
          {field.values.map((v) => {
            const checked = value.split(',').includes(v);
            return (
              <label key={v} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const parts = value ? value.split(',') : [];
                    const next = checked ? parts.filter((p) => p !== v) : [...parts, v];
                    onChange(next.join(','));
                  }}
                />
                {v}
              </label>
            );
          })}
        </div>
      );

    case 'radio':
      return (
        <div className="filter-radio-group">
          {field.values.map((v) => (
            <label key={v} className="filter-radio-label">
              <input
                type="radio"
                name={`additionalField_${field.fieldId}`}
                value={v}
                checked={value === v}
                onChange={() => onChange(v)}
              />
              {v}
            </label>
          ))}
        </div>
      );

    case 'multi select':
      return (
        <select
          multiple
          value={value ? value.split(',') : []}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, (o) => o.value);
            onChange(selected.join(','));
          }}
        >
          {field.values.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      );

    default:
      return (
        <input type="text" placeholder={`Enter ${field.name}`} value={value} onChange={(e) => onChange(e.target.value)} />
      );
  }
};

export default AdditionalFieldControl;
