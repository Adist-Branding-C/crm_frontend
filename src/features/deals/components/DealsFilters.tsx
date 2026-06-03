import React from 'react';
import type { DealsFiltersProps } from '../types';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DEAL_STATUS_OPTIONS, DEAL_TYPE_OPTIONS } from '../../../shared/constants/dealOptions';
import { MOCK_STAFF_OPTIONS } from '../../../shared/constants/mockStaff';

const DealsFilters: React.FC<DealsFiltersProps> = ({ filters, onFilterChange, onClearFilters, onClose }) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          {DEAL_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Type</label>
        <select value={filters.type} onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}>
          <option value="">All</option>
          {DEAL_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-input">
          <input type="date" value={filters.dateRange.start} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
          <span>to</span>
          <input type="date" value={filters.dateRange.end} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
        </div>
      </div>
      <div className="filter-group">
        <label>Assigned To</label>
        <select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })}>
          <option value="">Select</option>
          {MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onClose}>{ACTION_FILTER}</button>
        <button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
      </div>
    </div>
  </div>
);

export default DealsFilters;
