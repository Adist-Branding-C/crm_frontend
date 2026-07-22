import { Search, Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import ActivityStaffDropdownItem from './ActivityStaffDropdownItem';
import type { ActivityFiltersProps } from '../types';
import './ActivityFilters.css';

const ActivityFilters = ({
  filters,
  showStaffDropdown,
  staffSearchQuery,
  selectedStaffName,
  staffList,
  isLoading,
  onFilterChange,
  onStaffSelect,
  onApply,
  onReset,
  onShowStaffDropdownChange,
  onStaffSearchQueryChange,
}: ActivityFiltersProps) => {
  const dropdownRef = useClickOutside<HTMLDivElement>(() => onShowStaffDropdownChange(false));

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

      <div className="filter-group dropdown-group" ref={dropdownRef}>
        <label htmlFor="activity-staff-filter">Staff</label>
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
                value={staffSearchQuery}
                onChange={(e) => onStaffSearchQueryChange(e.target.value)}
              />
            </div>
            <div className="dropdown-list">
              {staffList.map(staff => (
                <ActivityStaffDropdownItem
                  key={staff.id}
                  staff={staff}
                  isSelected={filters.staff === staff.id}
                  onSelect={() => onStaffSelect(staff.id)}
                />
              ))}
            </div>
          </div>
        )}
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
