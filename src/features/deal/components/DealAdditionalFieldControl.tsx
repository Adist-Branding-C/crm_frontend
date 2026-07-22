import React from 'react';
import type { DealAdditionalFieldControlProps } from '../types/component.types';

const DealAdditionalFieldControl: React.FC<DealAdditionalFieldControlProps> = ({ field, value, onChange }) => {
  switch (field.fieldType.toLowerCase()) {
    case 'dropdown':
      return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select {field.fieldName}</option>
          {field.values.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      );

    case 'number':
      return (
        <input type="number" placeholder={`Enter ${field.fieldName}`} value={value} onChange={(e) => onChange(e.target.value)} />
      );

    case 'date':
      return (
        <input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
      );

    case 'text':
    default:
      return (
        <input type="text" placeholder={`Enter ${field.fieldName}`} value={value} onChange={(e) => onChange(e.target.value)} />
      );
  }
};

export default DealAdditionalFieldControl;
