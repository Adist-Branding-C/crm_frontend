import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { dealAnalyticsService } from '../../../deal-analytics/services/dealAnalyticsService';
import { useDealFilterOptions } from '../../../deal/hooks/useDealFilterOptions';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useToast } from '../../../../shared/hooks/useToast';
import Toast from '../../../../shared/components/Toast';
import DateRangePicker from '../../../../shared/components/filters/DateRangePicker';


const EXPORT_COLUMNS = [
  { key: 'dealName', label: 'Deal Name' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status (Stage)' },
  { key: 'dealStatus', label: 'Deal Status (Open/Won/Lost)' },
  { key: 'type', label: 'Type' },
  { key: 'agent', label: 'Agent' },
  { key: 'lead', label: 'Lead' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'currency', label: 'Currency' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'createdByName', label: 'Created By' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
];


const DealExportReport = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { statusOptions, typeOptions, staffOptions: assigneeOptions } = useDealFilterOptions();
  const { pipelineOptions } = useDealReportFilterOptions();

  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilterBy, setDateFilterBy] = useState('createdAt');
  const [pipelineId, setPipelineId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [type, setType] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const [selected, setSelected] = useState<string[]>(EXPORT_COLUMNS.map((c) => c.key));
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleColumn = (key: string) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const clearFilters = () => {
    setSearch(''); setStartDate(''); setEndDate(''); setDateFilterBy('createdAt');
    setPipelineId(''); setStatusId(''); setType(''); setAssignedTo('');
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast.showToastMessage('Select at least one column to export.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await dealAnalyticsService.createDealExport({
        columns: selected,
        ...(fileName.trim() ? { fileName: fileName.trim() } : {}),
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(startDate && endDate ? { startDate, endDate, dateFilterBy } : {}),
        ...(pipelineId ? { pipelineId } : {}),
        ...(statusId ? { statusId } : {}),
        ...(type ? { type } : {}),
        ...(assignedTo ? { assignedTo } : {}),
      });
      navigate('/reports/deal/export-history');
    } catch (error) {
      toast.showToastMessage(getErrorMessage(error, 'Failed to create export. Please try again.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Export" description="Export deals with selectable columns and a custom file name" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Search Deals</label>
            <input type="text" placeholder="Type a deal name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <DateRangePicker
            label="Date Range"
            value={{ start: startDate, end: endDate }}
            onChange={(range) => { setStartDate(range.start); setEndDate(range.end); }}
          />
          <div className="filter-group">
            <label>Filter By Date</label>
            <select value={dateFilterBy} onChange={(e) => setDateFilterBy(e.target.value)}>
              <option value="createdAt">Created Date</option>
              <option value="updatedAt">Updated Date</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Pipeline</label>
            <select value={pipelineId} onChange={(e) => setPipelineId(e.target.value)}>
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Stage</label>
            <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
              <option value="">All Stages</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Agent</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
              <option value="">All Agents</option>
              {assigneeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
          </div>
        </div>
      </div>

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group" style={{ maxWidth: '28rem' }}>
            <label>File Name (Optional)</label>
            <input
              type="text"
              placeholder="Deals_2026_09_14.xlsx"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Columns to Include
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelected(EXPORT_COLUMNS.map((c) => c.key))}>Select All</button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelected([])}>Clear Columns</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))', gap: '0.5rem' }}>
              {EXPORT_COLUMNS.map((col) => (
                <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <input type="checkbox" checked={selected.includes(col.key)} onChange={() => toggleColumn(col.key)} style={{ width: 'auto', minHeight: 'auto' }} />
                  {col.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="toolbar-right" style={{ gap: '0.75rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/reports/deal/export-history')}>
          View Export History
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
          <Send size={16} /> {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <Toast message={toast.toastMessage} type={toast.toastType} isVisible={toast.showToast} onClose={() => toast.setShowToast(false)} />
    </div>
  );
};

export default DealExportReport;
