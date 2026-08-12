import React from 'react';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DEAL_DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { useDealFilterOptions } from '../hooks/useDealFilterOptions';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import DealAdditionalFieldControl from './DealAdditionalFieldControl';
import type { DealFiltersProps } from '../types';

const DealFilters: React.FC<DealFiltersProps> = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
  const { statusOptions, typeOptions, staffOptions, isLoading } = useDealFilterOptions();
  const { dealAdditionalFieldDefs, additionalFieldDefsError } = useDealAdditionalFieldDefs();
  const filterableFields = dealAdditionalFieldDefs.filter(f => f.showInFilter);

  return (
    <div className="filters-panel">
      <div className="filter-row">
        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-range-input">
            <input type="date" value={filters.dateRange.start} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
            <span>to</span>
            <input type="date" value={filters.dateRange.end} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
          </div>
        </div>
        <div className="filter-group">
          <label>Filter by Date</label>
          <select value={filters.filterByDate} onChange={(e) => onFilterChange({ ...filters, filterByDate: e.target.value })}>
            <option value="">Select</option>
            {DEAL_DATE_FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select value={filters.status} onChange={(e) => onFilterChange({ ...filters, status: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-row">
        <div className="filter-group">
          <label>Type</label>
          <select value={filters.type} onChange={(e) => onFilterChange({ ...filters, type: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Assigned To</label>
          <select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {staffOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group" />
      </div>
      {additionalFieldDefsError && filterableFields.length === 0 && (
        <div className="filter-row">
          <small className="field-error-text">Couldn't load custom field filters: {additionalFieldDefsError}</small>
        </div>
      )}
      {filterableFields.length > 0 && (
        <div className="filter-row">
          {filterableFields.map(field => (
            <div className="filter-group" key={field.fieldId}>
              <label>{field.fieldName}</label>
              <DealAdditionalFieldControl
                field={field}
                value={filters.additionalFields[field.fieldId] ?? ''}
                onChange={(value) => onFilterChange({
                  ...filters,
                  additionalFields: { ...filters.additionalFields, [field.fieldId]: value },
                })}
              />
            </div>
          ))}
        </div>
      )}
      <div className="filter-row">
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={onApplyFilters}>{ACTION_FILTER}</button>
          <button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
        </div>
      </div>
    </div>
  );
};

export default DealFilters;
