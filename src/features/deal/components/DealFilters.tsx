import type { DealFiltersProps } from '../types';

const DealFilters = ({ filters, onFilterChange, onApplyFilters, onClearFilters }: DealFiltersProps) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="win">Deal Win</option>
          <option value="lost">Deal Lost</option>
          <option value="invoice">Invoice</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Type</label>
        <select value={filters.type} onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}>
          <option value="">All</option>
          <option value="sales">Sales</option>
          <option value="registration">Registration</option>
          <option value="renewal">Renewal</option>
          <option value="upsell">Upsell</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Assigned To</label>
        <select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })}>
          <option value="">Select</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Mike Johnson">Mike Johnson</option>
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onApplyFilters}>Filter</button>
        <button className="btn btn-secondary" onClick={onClearFilters}>Clear</button>
      </div>
    </div>
  </div>
);

export default DealFilters;
