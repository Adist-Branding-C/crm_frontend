import React from 'react';
import FilterSelect from '../../../shared/components/filters/FilterSelect';
import DateRangeFilter from '../../../shared/components/filters/DateRangeFilter';
import {
  ACTION_FILTER,
  ACTION_CLEAR,
} from '../../../shared/constants/actionLabels';
import type { FollowupFiltersProps } from '../types';

const FollowupFilters: React.FC<FollowupFiltersProps> = ({
  filters,
  typeOptions,
  statusOptions,
  sourceOptions,
  staffOptions,
  isLoadingFilterOptions,
  filterOptionsError,
  onFilterChange,
  onApply,
  onClear,
}) => (
  <div className="filters-panel">
    {filterOptionsError && (
      <div className="leaddrawer-error">
        {filterOptionsError} — showing "All" only.
      </div>
    )}
    <div className="filter-row">
      <FilterSelect
        id="followup-filter-type"
        label="Type"
        value={filters.type}
        options={typeOptions}
        disabled={isLoadingFilterOptions}
        onChange={(value) => onFilterChange({ ...filters, type: value })}
      />
      <FilterSelect
        id="followup-filter-status"
        label="Status"
        value={filters.status}
        options={statusOptions}
        disabled={isLoadingFilterOptions}
        onChange={(value) => onFilterChange({ ...filters, status: value })}
      />
      <FilterSelect
        id="followup-filter-source"
        label="Source"
        value={filters.source}
        options={sourceOptions}
        disabled={isLoadingFilterOptions}
        onChange={(value) => onFilterChange({ ...filters, source: value })}
      />
      <FilterSelect
        id="followup-filter-assigned-to"
        label="Assigned To"
        value={filters.assignedTo}
        options={staffOptions}
        disabled={isLoadingFilterOptions}
        onChange={(value) => onFilterChange({ ...filters, assignedTo: value })}
      />
    </div>
    <div className="filter-row">
      <DateRangeFilter
        label="Date Range"
        idPrefix="followup-filter-date-range"
        value={filters.dateRange}
        onChange={(dateRange) => onFilterChange({ ...filters, dateRange })}
      />
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onApply}>
          {ACTION_FILTER}
        </button>
        <button className="btn btn-secondary" onClick={onClear}>
          {ACTION_CLEAR}
        </button>
      </div>
    </div>
  </div>
);

export default FollowupFilters;
