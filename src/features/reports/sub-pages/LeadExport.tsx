import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../enquiries/pages/EnquiriesPage.css';
import './ReportsSubPages.css';
import PageHeader from '../../../shared/components/layout/PageHeader';
import Toast from '../../../shared/components/Toast';
import { useToast } from '../../../shared/hooks/useToast';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { useLeadFilterOptions } from '../../enquiries/hooks/useLeadFilterOptions';
import { useExportFieldOptions } from '../hooks/useExportFieldOptions';
import { leadExportService } from '../services/leadExportService';
import { buildLeadExportPayload } from '../utils/buildLeadExportPayload';
import { getErrorMessage } from '../../../shared/utils/error';
import type { LeadExportFilters } from '../types';

const INITIAL_FILTERS: LeadExportFilters = {
  dateRange: { start: '', end: '' },
  filterByDate: '',
  sourceId: '',
  purposeId: '',
  statusId: '',
  followUpAdded: '',
  assignedTo: '',
  typeId: '',
  location: '',
};

const LeadExport: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [filters, setFilters] = useState<LeadExportFilters>(INITIAL_FILTERS);
  const { sourceOptions, purposeOptions, statusOptions, staffOptions, typeOptions, isLoading: optionsLoading } = useLeadFilterOptions();
  const { fields, isLoading: fieldsLoading } = useExportFieldOptions();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const defaultsApplied = useRef(false);

  useEffect(() => {
    if (defaultsApplied.current || fields.length === 0) return;
    defaultsApplied.current = true;
    setSelectedFields(fields.map((f) => f.key));
  }, [fields]);

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldKey) ? prev.filter((f) => f !== fieldKey) : [...prev, fieldKey]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFields(e.target.checked ? fields.map((f) => f.key) : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || selectedFields.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = buildLeadExportPayload(filters, selectedFields);
      await leadExportService.createExport(payload);
      navigate('/reports/lead/export-history');
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to create export. Please try again.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enquiries-page">
      <PageHeader
        title="Export Leads"
        description="Filter leads and choose the columns to include in the export"
        breadcrumb={[
          { label: 'Export History', link: '/reports/lead/export-history' },
          { label: 'Export', link: null },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <div className="export-form-card">
          <div className="form-section">
            <h3 className="section-title">Filters</h3>

            <div className="filter-row">
              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-range-input">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })}
                  />
                </div>
              </div>
              <div className="filter-group">
                <label>Filter by Date</label>
                <select value={filters.filterByDate} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, filterByDate: e.target.value })}>
                  <option value="">Select</option>
                  {DATE_FILTER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Source</label>
                <select value={filters.sourceId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, sourceId: e.target.value })} disabled={optionsLoading}>
                  <option value="">Select</option>
                  {sourceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Purpose</label>
                <select value={filters.purposeId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, purposeId: e.target.value })} disabled={optionsLoading}>
                  <option value="">Select</option>
                  {purposeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select value={filters.statusId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, statusId: e.target.value })} disabled={optionsLoading}>
                  <option value="">Select</option>
                  {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Followup Added</label>
                <select value={filters.followUpAdded} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, followUpAdded: e.target.value })}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Assigned To</label>
                <select value={filters.assignedTo} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, assignedTo: e.target.value })} disabled={optionsLoading}>
                  <option value="">Select</option>
                  {staffOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Lead Type</label>
                <select value={filters.typeId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, typeId: e.target.value })} disabled={optionsLoading}>
                  <option value="">Select</option>
                  {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Fields to Export</h3>
            {fieldsLoading ? (
              <p>Loading fields...</p>
            ) : (
              <div className="fields-selection">
                <div className="field-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={fields.length > 0 && selectedFields.length === fields.length}
                      onChange={handleSelectAll}
                    />
                    Select All
                  </label>
                </div>
                <div className="fields-grid">
                  {fields.map((field) => (
                    <div key={field.key} className="field-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field.key)}
                          onChange={() => handleFieldToggle(field.key)}
                        />
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/reports/lead/export-history')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting || selectedFields.length === 0}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
      <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />
    </div>
  );
};

export default LeadExport;
