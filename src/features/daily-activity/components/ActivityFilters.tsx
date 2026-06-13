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
      <label>Date</label>
      <input
        type="date"
        value={filters.date}
        onChange={(e) => onFilterChange('date', e.target.value)}
        className="filter-input"
      />
    </div>

    <div className="filter-group">
      <label>Start Time</label>
      <input
        type="time"
        value={filters.startTime}
        onChange={(e) => onFilterChange('startTime', e.target.value)}
        className="filter-input"
      />
    </div>

    <div className="filter-group">
      <label>End Time</label>
      <input
        type="time"
        value={filters.endTime}
        onChange={(e) => onFilterChange('endTime', e.target.value)}
        className="filter-input"
      />
    </div>

    <div className="filter-group dropdown-group">
      <label>Staff</label>
      <div
        className="filter-select-trigger"
        onClick={() => onShowStaffDropdownChange(!showStaffDropdown)}
      >
        <span>{selectedStaffName}</span>
        <ChevronDown size={16} />
      </div>
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
            {staffList.map(staff => (
              <div
                key={staff.id}
                className={`dropdown-item ${filters.staff === staff.id ? 'selected' : ''}`}
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
