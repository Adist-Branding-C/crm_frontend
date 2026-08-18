import React from 'react';
import { X, Calendar } from 'lucide-react';
import type { FilterCardProps } from '../types';

const FilterCard: React.FC<FilterCardProps> = ({ filters, workflows, onFilterChange, onClearClick }) => (
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
          <option value="">All Workflows</option>
          {workflows.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)}>
          <option value="">All Status</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="processed">Processed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <div className="filter-actions">
        <button className="btn btn-secondary" onClick={onClearClick}><X size={14} /> Clear</button>
      </div>
    </div>
  </div>
);

export default FilterCard;
