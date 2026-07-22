import type { LabelValuePair } from '../../types/common';

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: LabelValuePair[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Label + "All"-prefixed <select> pair for a filter panel. Extracted from
 * FollowupFilters - the same label/select markup (the `filter-group` CSS
 * class) is also hand-rolled today in CompaniesFilters, ActivityFilters,
 * DealFilters, SpotlightFilters, EnquiriesFilters, and DeletedLeadsFilters;
 * this is the shared version any of those can move to.
 *
 * Used by:
 * - features/followup-required/components/FollowupFilters.
 */
const FilterSelect = ({ id, label, value, options, onChange, disabled }: FilterSelectProps) => (
  <div className="filter-group">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
