import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useSourceConversion } from '../../../deal-analytics/hooks/useSourceConversion';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useSourceOptions } from '../../../deal-analytics/hooks/useSourceOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import type { AnalyticsPeriod } from '../../../deal-analytics/types';

const PERIOD_OPTIONS: { value: AnalyticsPeriod | ''; label: string }[] = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];


const DealSourceConversionReport = () => {
  const [period, setPeriod] = useState<AnalyticsPeriod | ''>('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const [sourceId, setSourceId] = useState('');
  const { pipelineOptions } = useDealReportFilterOptions();
  const { sourceOptions, isLoading: sourceOptionsLoading } = useSourceOptions();

  const { data, isLoading, isError, error, refetch } = useSourceConversion({
    period: period || undefined,
    pipelineId,
    sourceIds: sourceId || undefined,
  });
  const rows = data ?? [];

  const handleExport = () => {
    const headers = ['Source', 'Total Deals', 'Won', 'Lost', 'Conversion Rate', 'Total Value', 'Won Revenue', 'Avg Deal Value'];
    const csvRows = rows.map((r) => [r.sourceName, r.total, r.won, r.lost, `${r.conversionRate}%`, r.totalAmount, r.wonAmount, r.avgDealValue]);
    const csv = [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'conversion_by_source.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Conversion Rate by Source" description="Conversion performance by originating lead source" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Period</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value as AnalyticsPeriod | '')}>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Pipeline</label>
            <select value={pipelineId ?? ''} onChange={(e) => setPipelineId(e.target.value ? Number(e.target.value) : undefined)}>
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Source</label>
            <select value={sourceId} onChange={(e) => setSourceId(e.target.value)} disabled={sourceOptionsLoading}>
              <option value="">Select</option>
              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => { setPeriod(''); setPipelineId(undefined); setSourceId(''); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={rows.length === 0}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && rows.length === 0}>
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Total Deals</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Conversion Rate</th>
                <th>Total Value</th>
                <th>Won Revenue</th>
                <th>Avg Deal Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sourceId ?? 'unknown'}>
                  <td>{r.sourceName}</td>
                  <td>{r.total}</td>
                  <td>{r.won}</td>
                  <td>{r.lost}</td>
                  <td>{r.conversionRate}%</td>
                  <td>{formatAmountWithCurrency(r.totalAmount)}</td>
                  <td>{formatAmountWithCurrency(r.wonAmount)}</td>
                  <td>{formatAmountWithCurrency(r.avgDealValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportStateWrapper>
    </div>
  );
};

export default DealSourceConversionReport;
