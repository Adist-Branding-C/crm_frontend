import type { ActivityTypeFilterProps } from '../types';
import './ActivityTypeFilter.css';

const ActivityTypeFilter = ({ activityTypeFilter, activityTypes, isLoading, onChange }: ActivityTypeFilterProps) => (
  <div className="activity-type-filter">
    <div className="activity-type-dropdown-group">
      <label htmlFor="activity-type-filter">Activity Type</label>
      <select
        id="activity-type-filter"
        className="filter-select"
        value={activityTypeFilter}
        disabled={isLoading}
        onChange={(e) => onChange(e.target.value)}
      >
        {activityTypes.map(type => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>
    </div>
  </div>
);

export default ActivityTypeFilter;
