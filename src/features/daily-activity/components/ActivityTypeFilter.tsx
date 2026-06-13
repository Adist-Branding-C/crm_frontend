import type { ActivityTypeFilterProps } from '../types';
import './ActivityTypeFilter.css';

const ActivityTypeFilter = ({ activityTypeFilter, activityTypes, onChange }: ActivityTypeFilterProps) => (
  <div className="activity-type-filter">
    <div className="activity-type-dropdown-group">
      <label>Activity Type</label>
      <select
        className="filter-select"
        value={activityTypeFilter}
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
