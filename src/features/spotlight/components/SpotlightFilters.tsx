import React, { useState, useEffect } from 'react';
import { DATE_FILTER_OPTIONS } from '../constants';
import type { SpotlightFiltersProps } from '../types';

const SpotlightFilters: React.FC<SpotlightFiltersProps> = ({
  filters,
  filterOptions,
  isLoading,
  onFilterChange,
  onClearFilters,
  onClose,
}) => {
  const [localLocation, setLocalLocation] = useState(filters.location || '');
  const [localRemarks, setLocalRemarks] = useState(filters.remarks || '');

  useEffect(() => {
    setLocalLocation(filters.location || '');
  }, [filters.location]);

  useEffect(() => {
    setLocalRemarks(filters.remarks || '');
  }, [filters.remarks]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localLocation !== (filters.location || '') || localRemarks !== (filters.remarks || '')) {
        onFilterChange({
          ...filters,
          location: localLocation,
          remarks: localRemarks,
        });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [localLocation, localRemarks, filters, onFilterChange]);

  return (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label htmlFor="spotlight-filter-date-start">Date Range</label>
        <div className="date-range-input">
          <input
            id="spotlight-filter-date-start"
            type="date"
            value={filters.dateRange.start}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value },
              })
            }
            placeholder="Start"
          />
          <span>to</span>
          <input
            aria-label="Date Range End"
            type="date"
            value={filters.dateRange.end}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value },
              })
            }
            placeholder="End"
          />
        </div>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-by-date">Filter by Date</label>
        <select
          id="spotlight-filter-by-date"
          value={filters.filterByDate}
          onChange={(e) =>
            onFilterChange({ ...filters, filterByDate: e.target.value })
          }
        >
          <option value="">Select</option>
          {DATE_FILTER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-source">Enquiry Source</label>
        <select
          id="spotlight-filter-source"
          value={filters.sourceId}
          disabled={isLoading}
          onChange={(e) =>
            onFilterChange({ ...filters, sourceId: e.target.value })
          }
        >
          <option value="">Select</option>
          {filterOptions.sources.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-purpose">Enquiry Purpose</label>
        <select
          id="spotlight-filter-purpose"
          value={filters.purposeId}
          disabled={isLoading}
          onChange={(e) =>
            onFilterChange({ ...filters, purposeId: e.target.value })
          }
        >
          <option value="">Select</option>
          {filterOptions.purposes.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label htmlFor="spotlight-filter-status">Lead Status</label>
        <select
          id="spotlight-filter-status"
          value={filters.statusId}
          disabled={isLoading}
          onChange={(e) =>
            onFilterChange({ ...filters, statusId: e.target.value })
          }
        >
          <option value="">Select</option>
          {filterOptions.statuses.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-assigned-to">Assigned To</label>
        <select
          id="spotlight-filter-assigned-to"
          value={filters.assignedTo}
          disabled={isLoading}
          onChange={(e) =>
            onFilterChange({ ...filters, assignedTo: e.target.value })
          }
        >
          <option value="">Select</option>
          {filterOptions.agents.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-lead-type">Lead Type</label>
        <select
          id="spotlight-filter-lead-type"
          value={filters.leadTypeId}
          disabled={isLoading}
          onChange={(e) =>
            onFilterChange({ ...filters, leadTypeId: e.target.value })
          }
        >
          <option value="">Select</option>
          {filterOptions.leadTypes.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="spotlight-filter-location">Location</label>
        <input
          id="spotlight-filter-location"
          type="text"
          placeholder="Enter location"
          value={localLocation}
          onChange={(e) => setLocalLocation(e.target.value)}
        />
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label htmlFor="spotlight-filter-remarks">Remarks</label>
        <input
          id="spotlight-filter-remarks"
          type="text"
          placeholder="Enter remarks"
          value={localRemarks}
          onChange={(e) => setLocalRemarks(e.target.value)}
        />
      </div>
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Done
        </button>
        <button className="btn btn-secondary" onClick={onClearFilters}>
          Clear
        </button>
      </div>
    </div>
  </div>
  );
};

export default SpotlightFilters;
