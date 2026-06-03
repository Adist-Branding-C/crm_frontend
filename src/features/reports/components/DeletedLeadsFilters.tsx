import React from 'react';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING } from '../../../shared/constants/statuses';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { LEAD_TYPE_OPTIONS } from '../../../shared/constants/leadTypes';
import { SOURCE_OPTIONS } from '../../../shared/constants/sources';
import { PURPOSE_OPTIONS } from '../../../shared/constants/purposes';
import { DATE_FILTER_OPTIONS_WITH_DELETED } from '../../../shared/constants/dateFilterOptions';
import { DELETE_REASON_OPTIONS } from '../../../shared/constants/deleteReasons';
import { MOCK_STAFF_OPTIONS } from '../../../shared/constants/mockStaff';
import type { DeletedLeadsFiltersProps } from '../types';

const DeletedLeadsFilters: React.FC<DeletedLeadsFiltersProps> = ({ filters, onFilterChange, onClearFilters, onClose }) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group"><label>Type</label><select value={filters.leadType} onChange={(e) => onFilterChange({ ...filters, leadType: e.target.value })}><option value="">All</option>{LEAD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
      <div className="filter-group"><label>Filter by Date</label><select value={filters.filterByDate} onChange={(e) => onFilterChange({ ...filters, filterByDate: e.target.value })}><option value="">Select</option>{DATE_FILTER_OPTIONS_WITH_DELETED.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-group"><label>Source</label><select value={filters.enquirySource} onChange={(e) => onFilterChange({ ...filters, enquirySource: e.target.value })}><option value="">Select</option>{SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
    </div>
    <div className="filter-row">
      <div className="filter-group"><label>Purpose</label><select value={filters.enquiryPurpose} onChange={(e) => onFilterChange({ ...filters, enquiryPurpose: e.target.value })}><option value="">All</option>{PURPOSE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-group"><label>Status</label><select value={filters.leadStatus} onChange={(e) => onFilterChange({ ...filters, leadStatus: e.target.value })}><option value="">All</option><option value={STATUS_ACTIVE}>{STATUS_ACTIVE}</option><option value={STATUS_INACTIVE}>{STATUS_INACTIVE}</option><option value={STATUS_PENDING}>{STATUS_PENDING}</option></select></div>
      <div className="filter-group"><label>Delete Reason</label><select value={filters.deleteReason} onChange={(e) => onFilterChange({ ...filters, deleteReason: e.target.value })}><option value="">All</option>{DELETE_REASON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-group"><label>Assigned To</label><select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })}><option value="">All</option>{MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-group"><label>Location</label><input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => onFilterChange({ ...filters, location: e.target.value })} /></div>
    </div>
    <div className="filter-row">
      <div className="filter-group"><label>Created By</label><select value={filters.createdBy} onChange={(e) => onFilterChange({ ...filters, createdBy: e.target.value })}><option value="">All</option>{MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      <div className="filter-actions"><button className="btn btn-primary" onClick={onClose}>{ACTION_FILTER}</button><button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button></div>
    </div>
  </div>
);

export default DeletedLeadsFilters;
