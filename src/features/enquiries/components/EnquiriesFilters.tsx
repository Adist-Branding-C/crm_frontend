import React, { useState, useEffect, useRef } from 'react';
import type { EnquiriesFiltersProps } from '../types';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { staffService } from '../../../features/deal/services/staff.service';
import { leadTypeService } from '../../../features/lead-settings/lead-types/services';
import { leadSourceService } from '../../../features/lead-settings/lead-source/services';
import { leadPurposeService } from '../../../features/lead-settings/lead-purpose/services';
import { leadStatusService } from '../../../features/lead-settings/lead-status/services';

interface DropdownOption {
  value: string;
  label: string;
}

let cachedTypeOptions: DropdownOption[] | null = null;
let cachedSourceOptions: DropdownOption[] | null = null;
let cachedPurposeOptions: DropdownOption[] | null = null;
let cachedStaffOptions: DropdownOption[] | null = null;
let cachedStatusOptions: DropdownOption[] | null = null;

const EnquiriesFilters: React.FC<EnquiriesFiltersProps> = ({ filters, onFilterChange, onApplyFilters, onClearFilters, onClose }) => {
  const [typeOptions, setTypeOptions] = useState<DropdownOption[]>(cachedTypeOptions ?? []);
  const [sourceOptions, setSourceOptions] = useState<DropdownOption[]>(cachedSourceOptions ?? []);
  const [purposeOptions, setPurposeOptions] = useState<DropdownOption[]>(cachedPurposeOptions ?? []);
  const [staffOptions, setStaffOptions] = useState<DropdownOption[]>(cachedStaffOptions ?? []);
  const [statusOptions, setStatusOptions] = useState<DropdownOption[]>(cachedStatusOptions ?? []);
  const [isLoading, setIsLoading] = useState(!cachedTypeOptions || !cachedStatusOptions);
  const hasLoaded = useRef(!!cachedTypeOptions && !!cachedStatusOptions);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const [typeRes, sourceRes, purposeRes, staffRes, statusRes] = await Promise.all([
          leadTypeService.getLeadTypes(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadPurposeService.getLeadPurposes(1, 100),
          staffService.getStaff(),
          leadStatusService.getLeadStatuses(1, 100),
        ]);

        const types = (typeRes?.data?.items ?? []).map((t: { typeId: string; type: string }) => ({ value: t.typeId, label: t.type }));
        const sources = (sourceRes?.data?.items ?? []).map((s: { sourceId: string; source: string }) => ({ value: s.sourceId, label: s.source }));
        const purposes = (purposeRes?.data?.items ?? []).map((p: { purposeId: string; purpose: string }) => ({ value: p.purposeId, label: p.purpose }));

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        const staff = staffData.map((s: { staff_id?: string; id?: string; name: string }) => ({ value: s.staff_id ?? s.id ?? '', label: s.name }));

        const statuses = (statusRes?.data?.items ?? []).map((s: { statusId: string; status: string }) => ({ value: s.statusId, label: s.status }));

        cachedTypeOptions = types;
        cachedSourceOptions = sources;
        cachedPurposeOptions = purposes;
        cachedStaffOptions = staff;
        cachedStatusOptions = statuses;

        setTypeOptions(types);
        setSourceOptions(sources);
        setPurposeOptions(purposes);
        setStaffOptions(staff);
        setStatusOptions(statuses);
      } catch {
        // silently fail, filters will have no options
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="filters-panel">
      <div className="filter-row">
        <div className="filter-group">
          <label>Type</label>
          <select value={filters.type} onChange={(e) => onFilterChange({ ...filters, type: e.target.value })} disabled={isLoading}>
            <option value="">All</option>
            {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
          <select value={filters.enquirySource} onChange={(e) => onFilterChange({ ...filters, enquirySource: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {sourceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-row">
        <div className="filter-group">
          <label>Enquiry Purpose</label>
          <select value={filters.enquiryPurpose} onChange={(e) => onFilterChange({ ...filters, enquiryPurpose: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {purposeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Lead Status</label>
          <select value={filters.leadStatus} onChange={(e) => onFilterChange({ ...filters, leadStatus: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
          <select value={filters.createdBy} onChange={(e) => onFilterChange({ ...filters, createdBy: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {staffOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-row">
        <div className="filter-group">
          <label>Assigned To</label>
          <select value={filters.assignedTo} onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {staffOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Lead Type</label>
          <select value={filters.leadType} onChange={(e) => onFilterChange({ ...filters, leadType: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={onApplyFilters}>{ACTION_FILTER}</button>
          <button className="btn btn-secondary" onClick={onClearFilters}>{ACTION_CLEAR}</button>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesFilters;
