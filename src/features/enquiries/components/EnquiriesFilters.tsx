import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Filters } from '../types';
import type { EnquiriesFiltersProps } from '../types/component.types';
import type { AdditionalFieldDef } from '../types/filter.types';
import type { LabelValuePair } from '../../../shared/types/common';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { staffService } from '../../../features/deal/services/staff.service';
import { leadTypeService } from '../../../features/lead-settings/lead-types/services';
import { leadSourceService } from '../../../features/lead-settings/lead-source/services';
import { leadPurposeService } from '../../../features/lead-settings/lead-purpose/services';
import { leadStatusService } from '../../../features/lead-settings/lead-status/services';
import { leadAdditionalService } from '../../../features/lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../../features/lead-settings/lead-additional/types';

let cachedTypeOptions: LabelValuePair[] | null = null;
let cachedSourceOptions: LabelValuePair[] | null = null;
let cachedPurposeOptions: LabelValuePair[] | null = null;
let cachedStaffOptions: LabelValuePair[] | null = null;
let cachedStatusOptions: LabelValuePair[] | null = null;
let cachedAdditionalFields: AdditionalFieldDef[] | null = null;

const EnquiriesFilters: React.FC<EnquiriesFiltersProps> = ({ filters, onFilterChange, onApplyFilters, onClearFilters, onClose }) => {
  const [typeOptions, setTypeOptions] = useState<LabelValuePair[]>(cachedTypeOptions ?? []);
  const [sourceOptions, setSourceOptions] = useState<LabelValuePair[]>(cachedSourceOptions ?? []);
  const [purposeOptions, setPurposeOptions] = useState<LabelValuePair[]>(cachedPurposeOptions ?? []);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>(cachedStaffOptions ?? []);
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>(cachedStatusOptions ?? []);
  const [additionalFields, setAdditionalFields] = useState<AdditionalFieldDef[]>(cachedAdditionalFields ?? []);
  const [isLoading, setIsLoading] = useState(!cachedTypeOptions || !cachedStatusOptions);
  const hasLoaded = useRef(!!cachedTypeOptions && !!cachedStatusOptions && !!cachedAdditionalFields);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const [typeRes, sourceRes, purposeRes, staffRes, statusRes, additionalRes] = await Promise.all([
          leadTypeService.getLeadTypes(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadPurposeService.getLeadPurposes(1, 100),
          staffService.getStaff(),
          leadStatusService.getLeadStatuses(1, 100),
          leadAdditionalService.getAll(1, 200),
        ]);

        const types = (typeRes?.data?.items ?? []).map((t: { typeId: string; type: string }) => ({ value: t.typeId, label: t.type }));
        const sources = (sourceRes?.data?.items ?? []).map((s: { sourceId: string; source: string }) => ({ value: s.sourceId, label: s.source }));
        const purposes = (purposeRes?.data?.items ?? []).map((p: { purposeId: string; purpose: string }) => ({ value: p.purposeId, label: p.purpose }));

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        const staff = staffData.map((s: { staff_id?: string; id?: string; name: string }) => ({ value: s.staff_id ?? s.id ?? '', label: s.name }));

        const statuses = (statusRes?.data?.items ?? []).map((s: { statusId: string; status: string }) => ({ value: s.statusId, label: s.status }));

        const rawAdditional = additionalRes?.data?.items ?? [];
        const filteredAdditional = rawAdditional
          .filter((f: LeadAdditionalApiItem) => f.showInFilter === true)
          .map((f: LeadAdditionalApiItem) => ({
            fieldId: f.fieldId,
            fieldKey: f.fieldKey,
            name: f.name,
            fieldType: f.fieldType,
            values: f.values ?? [],
            connectWithLeadPurpose: f.connectWithLeadPurpose,
            purposeId: f.purposeId,
          }));

        cachedTypeOptions = types;
        cachedSourceOptions = sources;
        cachedPurposeOptions = purposes;
        cachedStaffOptions = staff;
        cachedStatusOptions = statuses;
        cachedAdditionalFields = filteredAdditional;

        setTypeOptions(types);
        setSourceOptions(sources);
        setPurposeOptions(purposes);
        setStaffOptions(staff);
        setStatusOptions(statuses);
        setAdditionalFields(filteredAdditional);
      } catch {
        // silently fail, filters will have no options
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const visibleAdditionalFields = useMemo(() => {
    return additionalFields.filter((f) => {
      if (!f.connectWithLeadPurpose) return true;
      if (!filters.enquiryPurpose) return false;
      return f.purposeId === filters.enquiryPurpose;
    });
  }, [additionalFields, filters.enquiryPurpose]);

  const handleAdditionalFieldChange = (fieldId: string, value: string) => {
    onFilterChange({
      ...filters,
      additionalFields: {
        ...filters.additionalFields,
        [fieldId]: value,
      },
    });
  };

  const renderAdditionalFieldControl = (field: AdditionalFieldDef) => {
    const currentValue = filters.additionalFields[field.fieldId] ?? '';

    switch (field.fieldType.toLowerCase()) {
      case 'dropdown':
        return (
          <select value={currentValue} onChange={(e) => handleAdditionalFieldChange(field.fieldId, e.target.value)}>
            <option value="">Select {field.name}</option>
            {field.values.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input type="number" placeholder={`Enter ${field.name}`} value={currentValue} onChange={(e) => handleAdditionalFieldChange(field.fieldId, e.target.value)} />
        );

      case 'text':
        return (
          <input type="text" placeholder={`Enter ${field.name}`} value={currentValue} onChange={(e) => handleAdditionalFieldChange(field.fieldId, e.target.value)} />
        );

      case 'date':
        return (
          <input type="date" value={currentValue} onChange={(e) => handleAdditionalFieldChange(field.fieldId, e.target.value)} />
        );

      case 'checkbox':
        return (
          <div className="filter-checkbox-group">
            {field.values.map((v) => {
              const checked = currentValue.split(',').includes(v);
              return (
                <label key={v} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const parts = currentValue ? currentValue.split(',') : [];
                      const next = checked ? parts.filter((p) => p !== v) : [...parts, v];
                      handleAdditionalFieldChange(field.fieldId, next.join(','));
                    }}
                  />
                  {v}
                </label>
              );
            })}
          </div>
        );

      case 'radio':
        return (
          <div className="filter-radio-group">
            {field.values.map((v) => (
              <label key={v} className="filter-radio-label">
                <input
                  type="radio"
                  name={`additionalField_${field.fieldId}`}
                  value={v}
                  checked={currentValue === v}
                  onChange={() => handleAdditionalFieldChange(field.fieldId, v)}
                />
                {v}
              </label>
            ))}
          </div>
        );

      case 'multi select':
        return (
          <select
            multiple
            value={currentValue ? currentValue.split(',') : []}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, (o) => o.value);
              handleAdditionalFieldChange(field.fieldId, selected.join(','));
            }}
          >
            {field.values.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );

      default:
        return (
          <input type="text" placeholder={`Enter ${field.name}`} value={currentValue} onChange={(e) => handleAdditionalFieldChange(field.fieldId, e.target.value)} />
        );
    }
  };

  const additionalFieldRows = useMemo(() => {
    if (visibleAdditionalFields.length === 0) return null;

    const rows: React.ReactNode[] = [];
    for (let i = 0; i < visibleAdditionalFields.length; i += 4) {
      const chunk = visibleAdditionalFields.slice(i, i + 4);
      rows.push(
        <div className="filter-row" key={`af-row-${i}`}>
          {chunk.map((field) => (
            <div className="filter-group" key={field.fieldId}>
              <label>{field.name}</label>
              {renderAdditionalFieldControl(field)}
            </div>
          ))}
        </div>
      );
    }
    return rows;
  }, [visibleAdditionalFields, filters.additionalFields]);

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
      {additionalFieldRows}
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
