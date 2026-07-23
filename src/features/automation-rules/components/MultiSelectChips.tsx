import type { SelectOption } from '../types';

interface MultiSelectChipsProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiSelectChips = ({ options, value, onChange }: MultiSelectChipsProps) => {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="automation-chip-group">
      {options.map((option) => {
        const selected = value.includes(option.value);
        return (
          <button
            type="button"
            key={option.value}
            className={`automation-chip ${selected ? 'selected' : ''}`}
            onClick={() => toggle(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectChips;
