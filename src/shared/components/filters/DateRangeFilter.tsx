import type { DateRange } from '../../types/common';

interface DateRangeFilterProps {
  label: string;
  idPrefix: string;
  value: DateRange;
  onChange: (range: DateRange) => void;
}

/**
 * Labeled start/end date pair for a filter panel. Extracted from
 * FollowupFilters - the same "Date Range" start/end input markup is also
 * hand-rolled today in a few report filter panels; this is the shared
 * version any of those can move to.
 *
 * Used by:
 * - features/followup-required/components/FollowupFilters.
 */
const DateRangeFilter = ({ label, idPrefix, value, onChange }: DateRangeFilterProps) => {
  const labelId = `${idPrefix}-label`;
  return (
    <div className="filter-group">
      <label id={labelId}>{label}</label>
      <div className="date-range-input" role="group" aria-labelledby={labelId}>
        <input
          type="date"
          aria-label="Start date"
          value={value.start}
          onChange={(e) => onChange({ ...value, start: e.target.value })}
        />
        <span>to</span>
        <input
          type="date"
          aria-label="End date"
          value={value.end}
          onChange={(e) => onChange({ ...value, end: e.target.value })}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
