import { Search, Filter, RotateCcw, ChevronDown } from 'lucide-react';
import type { ActivityFiltersProps } from '../types';
import './ActivityFilters.css';

const ActivityFilters = ({
  filters,
  showStaffDropdown,
  localSearchQuery,
  selectedStaffName,
  staffList,
  onFilterChange,
  onApply,
  onReset,
  onShowStaffDropdownChange,
  onLocalSearchQueryChange,
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

      <div className="filter-group dropdown-group">
        <label >Staff</label>
        <button
          type="button"
          id="activity-staff-filter"
          className="filter-select-trigger"
          onClick={() => onShowStaffDropdownChange(!showStaffDropdown)}
        >
          <span>{selectedStaffName}</span>
          <ChevronDown size={16} />
        </button>

        {showStaffDropdown && (
          <div className="filter-dropdown">
            <div className="dropdown-search">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={localSearchQuery}
                onChange={(e) => onLocalSearchQueryChange(e.target.value)}
              />
            </div>
            <div className="dropdown-list">
              {staffList
                .filter(staff =>
                  staff.name
                    .toLowerCase()
                    .includes(localSearchQuery.toLowerCase())
                )
                .map(staff => (
                  <div
                    key={staff.id}
                    className={`dropdown-item ${filters.staff === staff.id ? 'selected' : ''
                      }`}
                    onClick={() => {
                      onFilterChange('staff', staff.id);
                      onShowStaffDropdownChange(false);
                    }}
                  >
                    {staff.name}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-buttons">
        <button className="apply-btn" onClick={onApply}>
          <Filter size={16} />
          Apply Filter
        </button>
        <button className="reset-btn" onClick={onReset}>
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ActivityFilters;
