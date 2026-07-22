import { Plus, X } from 'lucide-react';
import './DropdownValuesInput.css';
import type { DropdownValuesInputProps } from '../types/dropdown-values-input.types';

const DropdownValuesInput = ({ currentValue, values, onChange, onAdd, onRemove }: DropdownValuesInputProps) => (
  <div className="form-group">
    <label>Dropdown Values</label>
    <div className="dropdown-value-row">
      <input
        type="text"
        className="form-control"
        placeholder="Enter option value"
        value={currentValue}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAdd();
          }
        }}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={onAdd}
        aria-label="Add dropdown value"
      >
        <Plus size={16} />
      </button>
    </div>

    {values.length > 0 && (
      <div className="dropdown-values-list">
        {values.map((val, idx) => (
          <div key={idx} className="dropdown-value-item">
            <span>{val}</span>

            <button
              type="button"
              className="remove-dropdown-value"
              onClick={() => onRemove(idx)}
              aria-label={`Remove dropdown value ${val}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default DropdownValuesInput;
