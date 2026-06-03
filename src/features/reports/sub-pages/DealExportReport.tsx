import React, { useState } from 'react';
import './ReportsSubPages.css';
import { DEAL_DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { REPT_DEAL_STAGE_OPTIONS, REPT_DEAL_TYPE_OPTIONS, REPT_SORT_OPTIONS } from '../constants';
import { MOCK_STAFF_SHORT } from '../../../shared/constants/mockStaff';

const DealExportReport = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' }, dateBy: '', filterByDate: '', dealStatus: [] as string[],
    dealStage: '', dealType: '', agent: '', createdBy: '', completedBy: '', enquirySource: '',
    sortBy: 'createdDate', fileName: ''
  });
  const [selectedFields, setSelectedFields] = useState(['dealCode', 'dealName', 'dealAmount', 'dealStatus']);

  const dealStatusOptions = ['New', 'Create Papers', 'Invoice', 'In Progress', 'Final Stage', 'Deal Win', 'Deal Lost'];
  const fieldOptions = [
    { key: 'dateTime', label: 'Date & Time' }, { key: 'updatedDateTime', label: 'Updated Date & Time' },
    { key: 'dealCode', label: 'Deal Code' }, { key: 'dealName', label: 'Deal Name' },
    { key: 'dealAmount', label: 'Deal Amount' }, { key: 'dealType', label: 'Deal Type' },
    { key: 'dealStatus', label: 'Deal Status' }, { key: 'dealStage', label: 'Deal Stage' },
    { key: 'leadName', label: 'Lead Name' }, { key: 'companyName', label: 'Company Name' },
    { key: 'mobileNo', label: 'Mobile No' }, { key: 'staffName', label: 'Staff Name' },
    { key: 'startDate', label: 'Start Date' }, { key: 'endDate', label: 'End Date' },
    { key: 'createdBy', label: 'Created By' },
  ];

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      dealStatus: prev.dealStatus.includes(status)
        ? prev.dealStatus.filter(s => s !== status)
        : [...prev.dealStatus, status]
    }));
  };

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldKey) ? prev.filter(f => f !== fieldKey) : [...prev, fieldKey]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Deal Export request submitted successfully");
  };

  return (
    <div className="enquiries-page">
      <form onSubmit={handleSubmit}>
        <div className="export-form-card">
          <div className="form-section">
            <h3 className="section-title">Date Filter</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Choose Date Range</label>
                <div className="date-range-input">
                  <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} />
                  <span>to</span>
                  <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} />
                </div>
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Date By</label>
                <select value={filters.dateBy} onChange={(e) => setFilters({ ...filters, dateBy: e.target.value })}>
                  <option value="">Select</option>{DEAL_DATE_FILTER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Filter By Date</label>
                <select value={filters.filterByDate} onChange={(e) => setFilters({ ...filters, filterByDate: e.target.value })}>
                  <option value="">Select</option>{DEAL_DATE_FILTER_OPTIONS.slice(0, 2).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Deal Filters</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Deal Status</label>
                <div className="multi-select-dropdown" style={{ position: 'relative' }}>
                  <div className="multi-select-trigger" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', minHeight: '42px', cursor: 'pointer' }}>
                    {filters.dealStatus.length === 0 ? <span style={{ color: 'var(--text-muted)' }}>Select</span> : filters.dealStatus.map(s => <span key={s} className="multi-select-tag">{s}</span>)}
                  </div>
                </div>
              </div>
              <div className="filter-group">
                <label>Deal Stage</label>
                <select value={filters.dealStage} onChange={(e) => setFilters({ ...filters, dealStage: e.target.value })}>
                  <option value="">Select</option>{REPT_DEAL_STAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Deal Type</label>
                <select value={filters.dealType} onChange={(e) => setFilters({ ...filters, dealType: e.target.value })}>
                  <option value="">Select</option>{REPT_DEAL_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">User Filters</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Agent</label>
                <select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: e.target.value })}>
                  <option value="">Select</option>{MOCK_STAFF_SHORT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Created By</label>
                <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                  <option value="">Select</option>{MOCK_STAFF_SHORT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Completed By</label>
                <select value={filters.completedBy} onChange={(e) => setFilters({ ...filters, completedBy: e.target.value })}>
                  <option value="">Select</option>{MOCK_STAFF_SHORT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Sorting</h3>
            <div className="filter-row">
              <div className="filter-group">
                <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
                  {REPT_SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Export File Name</h3>
            <div className="filter-row">
              <div className="filter-group">
                <input type="text" placeholder="Enter file name" value={filters.fileName} onChange={(e) => setFilters({ ...filters, fileName: e.target.value })} className="file-name-input" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Fields Selection</h3>
            <div className="fields-selection">
              <div className="field-checkbox">
                <label><input type="checkbox" checked={selectedFields.length === fieldOptions.length} onChange={(e) => { if (e.target.checked) setSelectedFields(fieldOptions.map(f => f.key)); else setSelectedFields([]); }} /> Select All</label>
              </div>
              <div className="fields-grid">
                {fieldOptions.map(field => (
                  <div key={field.key} className="field-checkbox">
                    <label><input type="checkbox" checked={selectedFields.includes(field.key)} onChange={() => handleFieldToggle(field.key)} /> {field.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DealExportReport;
