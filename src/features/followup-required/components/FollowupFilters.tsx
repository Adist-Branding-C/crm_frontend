import React from 'react';
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
      <div className="filter-group">
        <label>Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          disabled={isLoadingFilterOptions}
        >
          <option value="">All</option>
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          disabled={isLoadingFilterOptions}
        >
          <option value="">All</option>
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Source</label>
        <select
          value={filters.source}
          onChange={(e) =>
            onFilterChange({ ...filters, source: e.target.value })
          }
          disabled={isLoadingFilterOptions}
        >
          <option value="">All</option>
          {sourceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Assigned To</label>
        <select
          value={filters.assignedTo}
          onChange={(e) =>
            onFilterChange({ ...filters, assignedTo: e.target.value })
          }
          disabled={isLoadingFilterOptions}
        >
          <option value="">All</option>
          {staffOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-input">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value },
              })
            }
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value },
              })
            }
          />
        </div>
      </div>
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
