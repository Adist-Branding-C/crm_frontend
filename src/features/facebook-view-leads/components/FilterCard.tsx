import React from 'react';
import { X, Calendar, Search, Filter } from 'lucide-react';
import type { FilterCardProps } from '../types';
import { workflowsList } from '../constants';

const FilterCard: React.FC<FilterCardProps> = ({ filters, onFilterChange, onClearClick }) => (
  <div className="filter-card">
    <h3 className="filter-card-title">Filter Options</h3>
    <div className="filter-grid">
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-input">
          <input type="date" value={filters.dateFrom} onChange={(e) => onFilterChange('dateFrom', e.target.value)} />
          <span className="date-separator">-</span>
          <input type="date" value={filters.dateTo} onChange={(e) => onFilterChange('dateTo', e.target.value)} />
          <button className="calendar-btn"><Calendar size={14} /></button>
        </div>
      </div>
      <div className="filter-group">
        <label>Workflow</label>
        <select value={filters.workflow} onChange={(e) => onFilterChange('workflow', e.target.value)}>
          {workflowsList.map(w => (
            <option key={w.id} value={w.id === 1 ? '' : w.name}>{w.name}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Search by Name or Phone</label>
        <div className="search-input-wrapper">
          <input type="text" placeholder="Enter at least 3 characters..." value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)} />
          <button className="search-btn"><Search size={14} /></button>
        </div>
      </div>
      <div className="filter-actions">
        <button className="btn btn-primary"><Filter size={14} /> Filter</button>
        <button className="btn btn-secondary" onClick={onClearClick}><X size={14} /> Clear</button>
      </div>
    </div>
  </div>
);

export default FilterCard;
