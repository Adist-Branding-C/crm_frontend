import React from 'react';
import type { CompaniesFiltersProps } from '../types';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { COMPANY_STATUS_OPTIONS } from '../constants';

const CompaniesFilters: React.FC<CompaniesFiltersProps> = ({ filters, onFilterChange, onClearFilters, onClose }) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          {COMPANY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onClose}>{ACTION_FILTER}</button>
        <button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
      </div>
    </div>
  </div>
);

export default CompaniesFilters;
