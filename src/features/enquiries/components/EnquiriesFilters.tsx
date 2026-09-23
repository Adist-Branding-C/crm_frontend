import React, { useEffect, useMemo, useState } from 'react';
import type { EnquiriesFiltersProps } from '../types/component.types';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { useLeadFilterOptions } from '../hooks/useLeadFilterOptions';
import { getVisibleAdditionalFields } from '../utils/leadFilterFields';
import { leadPipelineService } from '../../lead-pipeline-builder/services/leadPipeline.service';
import AdditionalFieldControl from './AdditionalFieldControl';
import DateRangePicker from '../../../shared/components/filters/DateRangePicker';
import type { LabelValuePair } from '../../../shared/types/common';

const EnquiriesFilters: React.FC<EnquiriesFiltersProps> = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
  const { typeOptions, sourceOptions, purposeOptions, staffOptions, statusOptions, pipelineOptions, additionalFields, isLoading } = useLeadFilterOptions();

  // when a Pipeline is picked, the Lead Stage dropdown re-scopes to
  // that pipeline's own stages (fetched via the canvas builder's existing
  // pipeline-detail endpoint) instead of the flat cross-pipeline list -
  // otherwise picking a stage here gives no indication which pipeline it
  // belongs to once a company has more than one.
  const [pipelineStageOptions, setPipelineStageOptions] = useState<LabelValuePair[] | null>(null);
  const [isPipelineStagesLoading, setIsPipelineStagesLoading] = useState(false);

  useEffect(() => {
    if (!filters.pipelineId) {
      setPipelineStageOptions(null);
      return;
    }
    let cancelled = false;
    setIsPipelineStagesLoading(true);
    leadPipelineService
      .getPipeline(Number(filters.pipelineId))
      .then((detail) => {
        if (cancelled) return;
        setPipelineStageOptions(detail.stages.map((s) => ({ value: s.id, label: s.status })));
      })
      .catch(() => {
        if (!cancelled) setPipelineStageOptions([]);
      })
      .finally(() => {
        if (!cancelled) setIsPipelineStagesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters.pipelineId]);

  const effectiveStatusOptions = filters.pipelineId ? pipelineStageOptions ?? [] : statusOptions;

  const handlePipelineChange = (pipelineId: string) => {
    // The previously selected stage may not exist in the newly picked
    // pipeline, so clear it rather than silently keeping a stale/invalid
    // selection.
    onFilterChange({ ...filters, pipelineId, leadStatus: '' });
  };

  const visibleAdditionalFields = useMemo(
    () => getVisibleAdditionalFields(additionalFields, filters.purposeId),
    [additionalFields, filters.purposeId],
  );

  const handleAdditionalFieldChange = (fieldId: string, value: string) => {
    onFilterChange({
      ...filters,
      additionalFields: {
        ...filters.additionalFields,
        [fieldId]: value,
      },
    });
  };

  const additionalFieldRows = useMemo(() => {
    if (visibleAdditionalFields.length === 0) return null;

    const rows: React.ReactNode[] = [];
    for (let i = 0; i < visibleAdditionalFields.length; i += 3) {
      const chunk = visibleAdditionalFields.slice(i, i + 3);
      rows.push(
        <div className="filter-row" key={`af-row-${i}`}>
          {chunk.map((field) => (
            <div className="filter-group" key={field.fieldId}>
              <label>{field.name}</label>
              <AdditionalFieldControl
                field={field}
                value={filters.additionalFields[field.fieldId] ?? ''}
                onChange={(value) => handleAdditionalFieldChange(field.fieldId, value)}
              />
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
        <DateRangePicker
          label="Date Range"
          value={filters.dateRange}
          onChange={(dateRange) => onFilterChange({ ...filters, dateRange })}
        />
        <div className="filter-group">
          <label>Filter by Date</label>
          <select value={filters.filterByDate} onChange={(e) => onFilterChange({ ...filters, filterByDate: e.target.value })}>
            <option value="">Select</option>
            {DATE_FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Enquiry Source</label>
          <select value={filters.sourceId} onChange={(e) => onFilterChange({ ...filters, sourceId: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {sourceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-row">
        <div className="filter-group">
          <label>Enquiry Purpose</label>
          <select value={filters.purposeId} onChange={(e) => onFilterChange({ ...filters, purposeId: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {purposeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Pipeline</label>
          <select value={filters.pipelineId} onChange={(e) => handlePipelineChange(e.target.value)} disabled={isLoading}>
            <option value="">All pipelines</option>
            {pipelineOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Lead Stage</label>
          <select value={filters.leadStatus} onChange={(e) => onFilterChange({ ...filters, leadStatus: e.target.value })} disabled={isLoading || isPipelineStagesLoading}>
            <option value="">Select</option>
            {effectiveStatusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
          <select value={filters.typeId} onChange={(e) => onFilterChange({ ...filters, typeId: e.target.value })} disabled={isLoading}>
            <option value="">Select</option>
            {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Location</label>
          <input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => onFilterChange({ ...filters, location: e.target.value })} />
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
