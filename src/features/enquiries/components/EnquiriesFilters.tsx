import React from 'react';
import type {  EnquiriesFiltersProps } from '../types';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING } from '../../../shared/constants/statuses';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { LEAD_TYPE_OPTIONS } from '../../../shared/constants/leadTypes';
import { SOURCE_OPTIONS } from '../../../shared/constants/sources';
import { PURPOSE_OPTIONS } from '../../../shared/constants/purposes';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { MOCK_STAFF_OPTIONS } from '../../../shared/constants/mockStaff';

const EnquiriesFilters: React.FC<EnquiriesFiltersProps> = ({ filters, onFilterChange, onClearFilters, onClose }) => (
  <div className="filters-panel">
    <div className="filter-row">
      <div className="filter-group">
        <label>Type</label>
        <select value={filters.type} onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}>
          <option value="">All</option>
          {LEAD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
        <label>Filter by Date</label>
        <select value={filters.filterByDate} onChange={(e) => onFilterChange({ ...filters, filterByDate: e.target.value })}>
          <option value="">Select</option>
          {DATE_FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Enquiry Source</label>
        <select value={filters.enquirySource} onChange={(e) => onFilterChange({ ...filters, enquirySource: e.target.value })}>
          <option value="">Select</option>
          {SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label>Enquiry Purpose</label>
        <select value={filters.enquiryPurpose} onChange={(e) => onFilterChange({ ...filters, enquiryPurpose: e.target.value })}>
          <option value="">Select</option>
          {PURPOSE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Lead Status</label>
        <select value={filters.leadStatus} onChange={(e) => onFilterChange({ ...filters, leadStatus: e.target.value })}>
          <option value="">Select</option>
          <option value={STATUS_ACTIVE}>{STATUS_ACTIVE}</option>
          <option value={STATUS_INACTIVE}>{STATUS_INACTIVE}</option>
          <option value={STATUS_PENDING}>{STATUS_PENDING}</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Followup Added</label>
        <select value={filters.followupAdded} onChange={(e) => onFilterChange({ ...filters, followupAdded: e.target.value })}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Created By</label>
        <select value={filters.createdBy} onChange={(e) => onFilterChange({ ...filters, createdBy: e.target.value })}>
          <option value="">Select</option>
          {MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label>Assigned To</label>
        <select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })}>
          <option value="">Select</option>
          {MOCK_STAFF_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Lead Type</label>
        <select value={filters.leadType} onChange={(e) => onFilterChange({ ...filters, leadType: e.target.value })}>
          <option value="">Select</option>
          {LEAD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Location</label>
        <input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => onFilterChange({ ...filters, location: e.target.value })} />
      </div>
      <div className="filter-group">
        <label>Date</label>
        <input type="date" value={filters.date} onChange={(e) => onFilterChange({ ...filters, date: e.target.value })} />
      </div>
    </div>
    <div className="filter-row">
      <div className="filter-group">
        <label>Remarks</label>
        <input type="text" placeholder="Enter remarks" value={filters.remarks} onChange={(e) => onFilterChange({ ...filters, remarks: e.target.value })} />
      </div>
      <div className="filter-actions">
        <button className="btn btn-primary" onClick={onClose}>{ACTION_FILTER}</button>
        <button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
      </div>
    </div>
  </div>
);

export default EnquiriesFilters;
