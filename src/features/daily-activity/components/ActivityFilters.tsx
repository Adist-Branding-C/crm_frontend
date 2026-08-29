import { Filter, RotateCcw } from 'lucide-react';
import type { ActivityFiltersProps } from '../types';
import './ActivityFilters.css';

const ActivityFilters = ({
  filters,
  staffList,
  isLoading,
  onFilterChange,
  onStaffSelect,
  onApply,
  onReset,
}: ActivityFiltersProps) => {
  return (
    <div className="activity-filters-section">
      <div className="filter-group">
        <label htmlFor="activity-date-filter">
          Date
        </label>
        <input
          id="activity-date-filter"
          type="date"
          value={filters.date}
          onChange={(e) => onFilterChange('date', e.target.value)}
          className="filter-input"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="activity-start-time-filter">
          Start Time
        </label>
        <input
          id="activity-start-time-filter"
          type="time"
          value={filters.startTime}
          onChange={(e) => onFilterChange('startTime', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="activity-end-time-filter">
          End Time
        </label>
        <input
          id="activity-end-time-filter"
          type="time"
          value={filters.endTime}
          onChange={(e) => onFilterChange('endTime', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="activity-staff-filter">Staff</label>
        <select
          id="activity-staff-filter"
          className="filter-input"
          value={filters.staff}
          onChange={(e) => onStaffSelect(e.target.value)}
        >
          {staffList.map(staff => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-buttons">
        <button className="apply-btn" onClick={onApply} disabled={isLoading}>
          <Filter size={16} />
          Apply Filter
        </button>
        <button className="reset-btn" onClick={onReset} disabled={isLoading}>
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ActivityFilters;
